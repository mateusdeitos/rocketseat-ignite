import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


const importCategoryUseCase = new ImportCategoryUseCase(CategoriesRepository.getInstance());

export const importCategoryController = new ImportCategoryController(importCategoryUseCase);
