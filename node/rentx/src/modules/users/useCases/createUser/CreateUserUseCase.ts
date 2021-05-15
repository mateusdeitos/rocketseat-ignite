import { inject, injectable } from "tsyringe";
import { ICreateUserDTO, IUsersRepository } from "../../repositories/IUsersRepository";
import { TOKEN_USERS_REPOSITORY } from '../../../../shared/container/index';
import { hash } from 'bcrypt'
import { AppError } from "@errors/AppError";

@injectable()
export class CreateUserUseCase {

	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository
	) { }

	public async execute({ password, email, ...rest }: ICreateUserDTO) {
		const userExists = await this.usersRepository.findByProp('email', email);
		if (userExists) {
			throw new AppError("User already exists.");
		}

		await this.usersRepository.create({
			password: await hash(password, 8),
			email,
			...rest
		});
	}
}