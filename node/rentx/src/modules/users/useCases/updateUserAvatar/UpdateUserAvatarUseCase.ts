import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { TOKEN_USERS_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";
import path from 'path';

@injectable()
export class UpdateUserAvatarUseCase {

	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository
	) { }

	async execute(userId: string, avatar_url: string): Promise<void> {
		const user = await this.usersRepository.findByProp('id', userId);
		if (!user) {
			throw new AppError("User not found", 400);
		}
		await Promise.all([
			deleteFile(path.resolve('tmp', 'avatar', user.avatar_url)),
			this.usersRepository.updateProp(userId, 'avatar_url', avatar_url),
		])
	}
}