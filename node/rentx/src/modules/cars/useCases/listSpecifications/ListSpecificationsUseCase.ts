import { inject, injectable } from "tsyringe";
import { TOKEN_SPECIFICATION_REPOSITORY } from "../../../../shared/container";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
@injectable()
export class ListSpecificationsUseCase {
	constructor(
		@inject(TOKEN_SPECIFICATION_REPOSITORY)
		private specificationsRepository: ISpecificationsRepository
	) { }

	public async execute(): Promise<Specification[]> {
		return this.specificationsRepository.list();
	}
}