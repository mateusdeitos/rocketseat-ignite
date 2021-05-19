import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { TOKEN_CARIMAGES_REPOSITORY } from "@shared/container";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";
import path from 'path'

@injectable()
export class UploadCarImageUseCase {

	constructor(
		@inject(TOKEN_CARIMAGES_REPOSITORY)
		private carImagesRepository: ICarImagesRepository
	) { }

	async execute(car_id: string, images: string[]): Promise<void> {
		const currentImages = await this.carImagesRepository.findByProp('car_id', car_id);
		await Promise.all(
			currentImages.map(async ({ image_name }) => {
				await deleteFile(path.resolve('tmp', 'cars', image_name));
			})
		)
		await this.carImagesRepository.deleteByCarId(car_id);

		await Promise.all(images.map(async (_image) => {
			await this.carImagesRepository.create(car_id, _image)
		}));
	}
}