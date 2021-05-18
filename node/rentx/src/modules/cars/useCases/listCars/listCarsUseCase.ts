import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ISearchFilters } from "@modules/cars/repositories/ICarsRepository";
import { TOKEN_CARS_REPOSITORY } from "@shared/container";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCarsUseCase {
	constructor(
		@inject(TOKEN_CARS_REPOSITORY)
		private carsRepository: ICarsRepository
	) { }

	async execute(filters: ISearchFilters): Promise<Car[]> {
		return this.carsRepository.list(filters);
	}
}