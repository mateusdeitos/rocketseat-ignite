import multer, { Options } from 'multer';
import path from 'path';
import crypto from 'crypto';

export const upload = (folder: string): Options => {
	return {
		storage: multer.diskStorage({
			destination: path.resolve(__dirname, '..', '..', folder),
			filename: (request, file, callback) => {
				const fileHash = crypto.randomBytes(16).toString('hex');
				const fileName = `${fileHash}-${file.originalname}`;

				return callback(null, fileName);
			}
		})
	}
}