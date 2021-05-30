import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { TOKEN_USERS_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";
import path from 'path';
import { TOKEN_STORAGE_PROVIDER } from "@shared/providers";
import { IStorageProvider } from "@shared/providers/StorageProvider/IStorageProvider";

@injectable()
export class UpdateUserAvatarUseCase {

	constructor(
		@inject(TOKEN_USERS_REPOSITORY)
		private usersRepository: IUsersRepository,
		@inject(TOKEN_STORAGE_PROVIDER)
		private storageProvider: IStorageProvider
	) { }

	async execute(userId: string, avatar_url: string): Promise<void> {
		const user = await this.usersRepository.findByProp('id', userId);
		if (!user) {
			throw new AppError("User not found", 400);
		}

		await this.storageProvider.delete(user.avatar_url, 'avatar');
		await this.usersRepository.updateProp(userId, 'avatar_url', avatar_url),
		await this.storageProvider.save(avatar_url, "avatar");
	}
}