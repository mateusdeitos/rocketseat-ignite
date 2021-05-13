import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
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
			throw new Error("Email or password incorrect!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email or password incorrect!");
		}
		const { password: _password, ...rest } = user;
		const token = sign({ ...rest }, "aehehauehuahuae", {
			subject: user.id,
			expiresIn: '1d'
		});

		return {
			user: { ...rest },
			token,
		}
	}
}