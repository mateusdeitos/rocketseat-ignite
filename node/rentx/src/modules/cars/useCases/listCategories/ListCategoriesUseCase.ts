import { inject, injectable } from "tsyringe";
import { TOKEN_CATEGORY_REPOSITORY } from "../../../../shared/container";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
@injectable()
export class ListCategoriesUseCase {
	constructor(
		@inject(TOKEN_CATEGORY_REPOSITORY)
		private categoriesRepository: ICategoriesRepository
	) { }

	public async execute(): Promise<Category[]> {
		return this.categoriesRepository.list();
	}
}