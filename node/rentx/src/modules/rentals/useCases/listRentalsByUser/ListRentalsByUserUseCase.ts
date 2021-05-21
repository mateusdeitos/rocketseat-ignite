import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { TOKEN_RENTALS_REPOSITORY } from "@shared/container";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsByUserUseCase {
	constructor(
		@inject(TOKEN_RENTALS_REPOSITORY)
		private rentalsRepository: IRentalsRepository
	) { }

	async execute(user_id: string): Promise<Rental[]> {
		return this.rentalsRepository.findRentalByUser(user_id);
	}
}