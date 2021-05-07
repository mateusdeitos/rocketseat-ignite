import { ICreateSpecificationDTO, ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

export class CreateSpecificationService {
	constructor(
		private categoriesRepository: ISpecificationsRepository
	) {}

	public async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const categoryExists = await this.categoriesRepository.findByProp('name', name);

		if (categoryExists) {
			throw new Error("Category already exists!");
		}

		await this.categoriesRepository.create({ name, description });
	}
}