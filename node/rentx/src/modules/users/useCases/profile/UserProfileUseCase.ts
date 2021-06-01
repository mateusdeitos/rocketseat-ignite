import { inject, injectable } from "tsyringe";
import { IProfileDTO, IUsersRepository } from "../../repositories/IUsersRepository";
import { TOKEN_USERS_REPOSITORY } from '../../../../shared/container/index';
import { AppError } from "@shared/errors/AppError";
import { UserMapper } from "@modules/users/mappers/UserMapper";

@injectable()
export class UserProfileUseCase {

	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository
	) { }

	public async execute(id: string): Promise<IProfileDTO> {
		const userExists = await this.usersRepository.findByProp('id', id);
		if (!userExists) {
			throw new AppError("User not found.", 404);
		}

		return UserMapper.toDTO(userExists);

	}
}