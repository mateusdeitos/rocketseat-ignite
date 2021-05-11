import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


export class ImportCategoryController {
	public async handle(request: Request, response: Response) {
		const { file } = request;
		const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
		await importCategoryUseCase.execute(file);
		return response.send();
	}
}