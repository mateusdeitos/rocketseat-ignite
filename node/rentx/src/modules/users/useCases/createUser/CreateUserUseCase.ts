import { inject, injectable } from "tsyringe";
import { ICreateUserDTO, IUsersRepository } from "../../repositories/IUsersRepository";
import { TOKEN_USERS_REPOSITORY } from '../../../../shared/container/index';

@injectable()
export class CreateUserUseCase {

	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository
	) { }

	public async execute(data: ICreateUserDTO) {
		await this.usersRepository.create(data);
	}
}