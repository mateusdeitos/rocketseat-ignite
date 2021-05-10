import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
	constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

	public async handle(request: Request, response: Response) {
		const all = await this.listSpecificationsUseCase.execute();
		return response.json(all);
	}
}