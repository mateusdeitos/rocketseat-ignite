import { ICategoriesRepository, ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";

export class CreateCategoryUseCase {
	constructor(
		private categoriesRepository: ICategoriesRepository
	) {}

	public async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
		const categoryExists = await this.categoriesRepository.findByProp('name', name);

		if (categoryExists) {
			throw new Error("Category already exists!");
		}

		await this.categoriesRepository.create({ name, description });
	}
}