import { Request, Response } from "express";
import { ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


export class CreateCategoryController {
	constructor(
		private createCategoryUseCase: CreateCategoryUseCase
	) { }
	public async handle(request: Request, response: Response) {

		const { name, description } = request.body as ICreateCategoryDTO;
		await this.createCategoryUseCase.execute({ name, description });
		return response.status(201).send();
	}
}