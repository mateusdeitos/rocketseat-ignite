import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


export default function () {
	const importCategoryUseCase = new ImportCategoryUseCase(new CategoriesRepository());

	const importCategoryController = new ImportCategoryController(importCategoryUseCase);
	return importCategoryController;
}
