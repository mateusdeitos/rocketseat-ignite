import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";
import { TOKEN_USERSTOKEN_REPOSITORY, TOKEN_USERS_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { TOKEN_DATE_PROVIDER, TOKEN_MAIL_PROVIDER } from "@shared/providers";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/providers/MailProvider/IMailProvider";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import path from 'path';


@injectable()
export class SendForgotPasswordMailUseCase {

	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository,
		@inject(TOKEN_USERSTOKEN_REPOSITORY)
		private usersTokenRepository: IUsersTokenRepository,
		@inject(TOKEN_DATE_PROVIDER)
		private dateProvider: IDateProvider,
		@inject(TOKEN_MAIL_PROVIDER)
		private mailProvider: IMailProvider
	) { }

	async execute(email: string) {
		const user = await this.usersRepository.findByProp('email', email);

		if (!user) {
			throw new AppError("User does not exists");
		}

		const token = v4();

		await this.usersTokenRepository.create({
			refresh_token: token,
			user_id: user.id,
			expires_date: this.dateProvider.addHours(3)
		})

		const templatePath = path.resolve(__dirname, '..', '..', 'templates', 'emails', 'forgotPassword.hbs');

		const variables = {
			name: user.name, 
			link: `http://localhost:${process.env.PORT}/sessions/forgot-password?token=${token}`,
		}

		await this.mailProvider.sendMail(
			email,
			'Recuperação de senha',
			variables,
			templatePath
		)


	}

}