import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { TOKEN_CARS_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateCarUseCase {

	constructor(
		@inject(TOKEN_CARS_REPOSITORY)
		private carsRepository: ICarsRepository
	) { }

	public async execute(data: ICreateCarDTO): Promise<void> {
		const carWithSameLicense = await this.carsRepository.findByProp('license_plate', data.license_plate);
		if (!!carWithSameLicense) {
			throw new AppError("This license is invalid");
		}
		await this.carsRepository.create({ ...data });
	}
}