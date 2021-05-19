import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { TOKEN_CARS_REPOSITORY, TOKEN_SPECIFICATION_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	car_id: string;
	specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {

	constructor(
		@inject(TOKEN_CARS_REPOSITORY)
		private carsRepository: ICarsRepository,
		@inject(TOKEN_SPECIFICATION_REPOSITORY)
		private specificationsRepository: ISpecificationsRepository
	) { }

	async execute({ car_id, specifications_id }: IRequest): Promise<void> {
		const car = await this.carsRepository.findByProp('id', car_id);
		if (!car) {
			throw new AppError("Car does not exists");
		}

		const specifications = await this.specificationsRepository.findByIds(specifications_id);

		Object.assign(car, { specifications });

		await this.carsRepository.create(car);
	}
}