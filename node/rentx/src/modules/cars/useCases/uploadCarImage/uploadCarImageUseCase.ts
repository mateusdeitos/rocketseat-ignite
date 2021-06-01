import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { TOKEN_CARIMAGES_REPOSITORY } from "@shared/container";
import { inject, injectable } from "tsyringe";
import { TOKEN_STORAGE_PROVIDER } from "@shared/providers";
import { IStorageProvider } from "@shared/providers/StorageProvider/IStorageProvider";

@injectable()
export class UploadCarImageUseCase {

	constructor(
		@inject(TOKEN_CARIMAGES_REPOSITORY)
		private carImagesRepository: ICarImagesRepository,
		@inject(TOKEN_STORAGE_PROVIDER)
		private storageProvider: IStorageProvider
	) { }

	async execute(car_id: string, images: string[]): Promise<void> {
		const currentImages = await this.carImagesRepository.findByProp('car_id', car_id);
		await Promise.all(
			currentImages.map(async ({ image_name }) => {
				await this.storageProvider.delete(image_name, 'cars');
			})
		)
		await this.carImagesRepository.deleteByCarId(car_id);

		await Promise.all(images.map(async (_image) => {
			await this.carImagesRepository.create(car_id, _image);
			await this.storageProvider.save(_image, "cars");
		}));
	}
}