import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


export class CreateCategoryController {
	constructor() { }
	public async handle(request: Request, response: Response) {

		const { name, description } = request.body as ICreateCategoryDTO;
		const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
		await createCategoryUseCase.execute({ name, description });
		return response.status(201).send();
	}
}