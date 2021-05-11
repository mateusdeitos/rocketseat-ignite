import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { Request, Response } from "express";
import { ICreateSpecificationDTO } from "../../repositories/ISpecificationsRepository";
import { container } from "tsyringe";

export class CreateSpecificationController {
	public async handle(request: Request, response: Response) {
		const { name, description } = request.body as ICreateSpecificationDTO;
		const createSpecificationUseCase  = container.resolve(CreateSpecificationUseCase);
		await createSpecificationUseCase.execute({ name, description });
		return response.status(201).send();
	}
}