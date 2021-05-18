import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { TOKEN_CARS_REPOSITORY } from "@shared/container";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCarsUseCase {
	constructor(
		@inject(TOKEN_CARS_REPOSITORY)
		private carsRepository: ICarsRepository
	){}

	async execute(pesquisa: string): Promise<Car[]> {
		return this.carsRepository.list(pesquisa);
	}
}