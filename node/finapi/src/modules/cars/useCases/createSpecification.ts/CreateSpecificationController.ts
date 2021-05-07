import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { Request, Response } from "express";
import { ICreateSpecificationDTO } from "../../repositories/ISpecificationsRepository";

export class CreateSpecificationController {
	constructor(private createSpecificationUseCase: CreateSpecificationUseCase){}

	public async handle(request: Request, response: Response) {
		const { name, description } = request.body as ICreateSpecificationDTO;
		await this.createSpecificationUseCase.execute({ name, description });
		return response.status(201).send();
	}
}