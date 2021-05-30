import { IStorageProvider } from "../IStorageProvider";
import fs from 'fs';
import path from 'path';
import { upload } from "@config/upload";
import { deleteFile } from "@utils/file";
import { S3 } from 'aws-sdk';
import mime from 'mime';

export class S3StorageProvider implements IStorageProvider {
	private client: S3;

	constructor() {
		this.client = new S3({
			region: process.env.AWS_BUCKET_REGION,
		})
	}

	async save(file: string, folder: string): Promise<string> {
		const originalName = path.resolve(upload.tmpFolder, file);
		const Body = await fs.promises.readFile(originalName);
		const Bucket = `${process.env.AWS_BUCKET}/${folder}`;
		const Key = file;
		const ACL = 'public-read';
		const ContentType = mime.getType(originalName);

		await this.client.putObject({
			Bucket,
			Key,
			ACL,
			Body,
			ContentType,
		}).promise();

		await fs.promises.unlink(originalName);

		return file;
	}

	async delete(file: string, folder: string): Promise<void> {
		await this.client.deleteObject({
			Bucket: `${process.env.AWS_BUCKET}/${folder}`,
			Key: file,
		}).promise().catch(error => console.log(error));
	}
}