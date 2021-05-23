import { authConfig } from "@config/auth";
import { IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";
import { TOKEN_USERSTOKEN_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { TOKEN_DATE_PROVIDER } from "@shared/providers";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { decode, sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
	email: string;
	sub: string;
}

@injectable()
export class RefreshTokenUseCase {

	constructor(
		@inject(TOKEN_USERSTOKEN_REPOSITORY)
		private usersTokenRepository: IUsersTokenRepository,
		@inject(TOKEN_DATE_PROVIDER)
		private dateProvider: IDateProvider
	) { }

	async execute(refresh_token: string) {
		try {
			verify(refresh_token, authConfig.secret.refresh_token);
			const { sub: id, email } = decode(refresh_token) as IPayload;
			const tokenExists = await this.usersTokenRepository.findByProp('refresh_token', refresh_token);
			if (!tokenExists) {
				throw new AppError("Refresh token does not exists");
			}

			const { user_id } = tokenExists;
			if (user_id !== id) {
				throw new AppError("Invalid refresh token");
			}

			await this.usersTokenRepository.deleteById(tokenExists.id);

			const newToken = sign({}, authConfig.secret.token, {
				subject: user_id,
				expiresIn: authConfig.expiresIn.token
			})

			const newRefreshToken = sign({ email }, authConfig.secret.refresh_token, {
				subject: user_id,
				expiresIn: authConfig.expiresIn.refresh_token.jwt
			})

			await this.usersTokenRepository.create({
				refresh_token: newRefreshToken,
				expires_date: this.dateProvider.addDays(authConfig.expiresIn.refresh_token.database),
				user_id
			})

			return {
				token: newToken,
				refresh_token: newRefreshToken
			};


		} catch (error) {
			throw new AppError("Invalid refresh_token");
		}
	}
}