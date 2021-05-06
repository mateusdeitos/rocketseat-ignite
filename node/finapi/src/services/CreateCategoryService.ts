import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
	name: string;
	description: string;
}

export class CreateCategoryService {
	constructor(
		private categoriesRepository: ICategoriesRepository
	) {}

	public async execute({ name, description }: IRequest): Promise<void> {
		const categoryExists = await this.categoriesRepository.findByProp('name', name);

		if (categoryExists) {
			throw new Error("Category already exists!");
		}

		await this.categoriesRepository.create({ name, description });
	}
}