import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "./ISpecificationsRepository";


export class SpecificationsRepository implements ISpecificationsRepository {
	private specifications: Specification[];

	constructor() { this.specifications = [] }

	public async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
		const specification = new Specification();
		Object.assign(specification, {
			name,
			description
		})
		this.specifications.push(specification);
	}

	public async list(): Promise<Specification[]> {
		return this.specifications;
	}

	public async findByProp(prop: keyof Specification, value: Specification[keyof Specification]): Promise<Specification | undefined> {
		return this.specifications.find(cat => cat[prop] === value);
	}
}