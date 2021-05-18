import { ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./createCarUseCase";


export class CreateCarController {
	async handle(request: Request, response: Response) {
		const { ...car } = request.body as ICreateCarDTO;
		const createCarUseCase = container.resolve(CreateCarUseCase);
		await createCarUseCase.execute(car);
		return response.status(201).send();
	}
}