import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export default function () {
	const listCategoriesUseCase = new ListCategoriesUseCase(
		new CategoriesRepository()
	);
	
	const listCategoriesController = new ListCategoriesController(
		listCategoriesUseCase
	)

	return listCategoriesController;
}