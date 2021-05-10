import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoriesUseCase {
	constructor(private categoriesRepository: ICategoriesRepository){}

	public async execute(): Promise<Category[]> { 
		const categories = await this.categoriesRepository.list();
		return categories;
	}
}