import { TOKEN_CARS_REPOSITORY, TOKEN_RENTALS_REPOSITORY } from "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateRentalDTO, IRentalsRepository } from "../repositories/IRentalsRepository";
import { TOKEN_DATE_PROVIDER } from "@shared/providers";
import { IDateProvider } from '../../../shared/providers/DateProvider/IDateProvider';
import { Rental } from '../infra/typeorm/entities/Rental';
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
export class CreateRentalsUseCase {

	constructor(
		@inject(TOKEN_RENTALS_REPOSITORY)
		private rentalsRepository: IRentalsRepository,
		@inject(TOKEN_DATE_PROVIDER)
		private dateProvider: IDateProvider,
		@inject(TOKEN_CARS_REPOSITORY)
		private carsRepository: ICarsRepository
	) { }

	async execute({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {

		const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
		if (carUnavailable) {
			throw new AppError("Car is unavailable");
		}

		const carIsCurrentlyRented = await this.rentalsRepository.findOpenRentalByUser(user_id);
		if (carIsCurrentlyRented) {
			throw new AppError("You already have a rental in progress.");
		}
		const compare = this.dateProvider.compareInHours(
			expected_return_date,
			this.dateProvider.dateNow(),
		)

		if (compare < 24) {
			throw new AppError("Invalid return time!")
		}

		await this.carsRepository.updateProp(car_id, 'available', false);

		return this.rentalsRepository.create({ car_id, user_id, expected_return_date });
	}
}