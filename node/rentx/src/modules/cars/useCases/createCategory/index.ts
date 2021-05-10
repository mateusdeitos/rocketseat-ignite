import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default function () {
	const createCategoryUseCase = new CreateCategoryUseCase(new CategoriesRepository());
	
	const createCategoryController = new CreateCategoryController(createCategoryUseCase)

	return createCategoryController;
}