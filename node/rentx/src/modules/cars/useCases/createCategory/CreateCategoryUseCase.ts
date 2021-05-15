import { inject, injectable } from "tsyringe";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";
import { TOKEN_CATEGORY_REPOSITORY } from '@shared/container/index';
import { AppError } from "@errors/AppError";

@injectable()
export class CreateCategoryUseCase {
	constructor(
		@inject(TOKEN_CATEGORY_REPOSITORY)
		private categoriesRepository: ICategoriesRepository
	) {}

	public async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
		const categoryExists = await this.categoriesRepository.findByProp('name', name);

		if (categoryExists) {
			throw new AppError("Category already exists!");
		}

		await this.categoriesRepository.create({ name, description });
	}
}