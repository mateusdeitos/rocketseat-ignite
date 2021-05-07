import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

export class ListSpecificationsUseCase {
	constructor(private specificationsRepository: ISpecificationsRepository){}

	public async execute(): Promise<Specification[]> { 
		const categories = await this.specificationsRepository.list();
		return categories;
	}
}