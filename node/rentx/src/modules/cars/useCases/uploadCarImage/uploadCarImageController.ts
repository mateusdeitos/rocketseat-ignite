import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./uploadCarImageUseCase";


export class UploadCarImageController {
	async handle(request: Request, response: Response) {
		const { id: car_id } = request.params;
		const images = request.files as { filename: string; }[];
		const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);
		await uploadCarImageUseCase.execute(car_id, images.map(file => file.filename));

		return response.status(204).send();
	}
}