import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";
import { TOKEN_USERSTOKEN_REPOSITORY, TOKEN_USERS_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { TOKEN_DATE_PROVIDER } from "@shared/providers";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
export class ResetPasswordUseCase {
	constructor(
		@inject(TOKEN_USERSTOKEN_REPOSITORY)
		private usersTokenRepository: IUsersTokenRepository,
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository,
		@inject(TOKEN_DATE_PROVIDER)
		private dateProvider: IDateProvider
	) { }

	async execute(token: string, password: string) {
		if (!password) {
			throw new AppError("Password invalid")
		}

		const userToken = await this.usersTokenRepository.findByProp('refresh_token', token);
		if (!userToken) {
			throw new AppError("Token not found")
		}

		if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
			throw new AppError("Token invalid")
		}

		const { user_id } = userToken;
		const user = await this.usersRepository.findByProp('id', user_id);
		if (!user) {
			throw new AppError("User not found")
		}

		await this.usersRepository.updateProp(user_id, 'password', (await hash(password, 8)))

		await this.usersTokenRepository.deleteById(userToken.id);


	}
}