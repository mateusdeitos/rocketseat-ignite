import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { TOKEN_USERSTOKEN_REPOSITORY, TOKEN_USERS_REPOSITORY } from "../../../../shared/container";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { authConfig } from "@config/auth";
import { IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";
import { TOKEN_DATE_PROVIDER } from "@shared/providers";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
	refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository,
		@inject(TOKEN_USERSTOKEN_REPOSITORY)
		private usersTokenRepository: IUsersTokenRepository,
		@inject(TOKEN_DATE_PROVIDER)
		private dateProvider: IDateProvider
	) { }

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByProp('email', email);

		if (!user) {
			throw new AppError("Email or password incorrect!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError("Email or password incorrect!");
		}
		const token = sign({}, authConfig.secret.token, {
			subject: user.id,
			expiresIn: authConfig.expiresIn.token
		});

		const refreshToken = sign({ email }, authConfig.secret.refresh_token, {
			subject: user.id,
			expiresIn: authConfig.expiresIn.refresh_token.jwt
		})

		const { refresh_token } = await this.usersTokenRepository.create({
			user_id: user.id,
			refresh_token: refreshToken,
			expires_date: this.dateProvider.addDays(authConfig.expiresIn.refresh_token.database),
		})

		const { password: _password, ...rest } = user;
		return {
			user: { ...rest },
			token,
			refresh_token,
		}
	}
}