import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { TOKEN_USERS_REPOSITORY } from "../../../../shared/container";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
}

@injectable()
export class AuthenticateUserUseCase {
	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository
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
		const token = sign({ }, "aehehauehuahuae", {
			subject: user.id,
			expiresIn: '1d'
		});
		
		const { password: _password, ...rest } = user;
		return {
			user: { ...rest },
			token,
		}
	}
}