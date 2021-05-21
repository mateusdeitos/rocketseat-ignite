import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { TOKEN_CARS_REPOSITORY, TOKEN_RENTALS_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { TOKEN_DATE_PROVIDER } from "@shared/providers";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IDevolutionRentalDTO {
	id: string;
}

@injectable()
export class DevolutionRentalUseCase {

	constructor(
		@inject(TOKEN_RENTALS_REPOSITORY)
		private rentalsRepository: IRentalsRepository,
		@inject(TOKEN_CARS_REPOSITORY)
		private carsRepository: ICarsRepository,
		@inject(TOKEN_DATE_PROVIDER)
		private dateProvider: IDateProvider
	) { }

	async execute({ id }: IDevolutionRentalDTO): Promise<Rental> {
		const rental = await this.rentalsRepository.findByProp('id', id);
		if (!rental) {
			throw new AppError("Rental not found", 404);
		}

		const { car_id } = rental;

		const car = await this.carsRepository.findByProp('id', car_id);
		if (!car) {
			throw new AppError("Car not found", 404);
		}

		const { start_date, expected_return_date } = rental;
		const dateNow = this.dateProvider.dateNow();
		const diffInDays = Math.max(24, this.dateProvider.compareInHours(dateNow, start_date)) / 24;
		const delayToReturn = this.dateProvider.compareInHours(dateNow, expected_return_date) / 24;

		let total = 0;
		if (delayToReturn > 0) {
			const fine = delayToReturn * car.fine_amount;
			total += fine;
		}

		total += diffInDays * car.daily_rate;

		await this.rentalsRepository.updateProp(id, 'end_date', dateNow);
		await this.rentalsRepository.updateProp(id, 'total', total);
		await this.carsRepository.updateProp(car_id, 'available', true);

		return { ...rental, end_date: dateNow, total };

	}
}