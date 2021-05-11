import { inject, injectable } from "tsyringe";
import { TOKEN_SPECIFICATION_REPOSITORY } from "../../../../shared/container";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class CreateSpecificationUseCase {
	constructor(
		@inject(TOKEN_SPECIFICATION_REPOSITORY)
		private specificationsRepository: ISpecificationsRepository
	) {}

	public async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specificationExists = await this.specificationsRepository.findByProp('name', name);

		if (specificationExists) {
			throw new Error("Category already exists!");
		}

		await this.specificationsRepository.create({ name, description });
	}
}