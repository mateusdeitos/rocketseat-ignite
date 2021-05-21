import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";


export class CreateRentalsController {
	async handle(request: Request, response: Response) {
		const {expected_return_date, car_id} = request.body;
		const {id} = request.user;
		const createRentalsUseCase = container.resolve(CreateRentalsUseCase);

		const rental = await createRentalsUseCase.execute({
			car_id,
			expected_return_date,
			user_id: id,
		})

		return response.json(rental);
	}
}