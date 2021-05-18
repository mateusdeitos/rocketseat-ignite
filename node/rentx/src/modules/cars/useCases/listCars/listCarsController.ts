import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./listCarsUseCase";


export class ListCarsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { q, limit, offset } = request.query;
		const listCarsUseCase = container.resolve(ListCarsUseCase);
		const cars = await listCarsUseCase.execute({
			q: String(q || ""),
			limit: Number(limit || 20),
			offset: Number(offset || 0),
		});
		return response.json(cars).send();
	}
}