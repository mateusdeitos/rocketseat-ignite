import { IStorageProvider } from "../IStorageProvider";
import fs from 'fs';
import path from 'path';
import { upload } from "@config/upload";
import { deleteFile } from "@utils/file";

export class LocalStorageProvider implements IStorageProvider {
	async save(file: string, folder: string): Promise<string> {
		fs.promises.rename(
			path.resolve(upload.tmpFolder, file),
			path.resolve(upload.tmpFolder, folder, file)
		)

		return file;
	}

	async delete(file: string, folder: string): Promise<void> {
		const filename = path.resolve(upload.tmpFolder, folder, file);
		await deleteFile(filename);
	}
}