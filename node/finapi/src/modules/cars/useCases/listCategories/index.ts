import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const listCategoriesUseCase = new ListCategoriesUseCase(
	CategoriesRepository.getInstance()
);

export const listCategoriesController = new ListCategoriesController(
	listCategoriesUseCase
)