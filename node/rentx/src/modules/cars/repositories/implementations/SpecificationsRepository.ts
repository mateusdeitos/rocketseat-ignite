import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


export class SpecificationsRepository implements ISpecificationsRepository {
	private repository: Repository<Specification>;
	constructor() {
		this.repository = getRepository(Specification);
	}

	public async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create({ description, name });
		this.repository.save(specification);
	}

	public async list(): Promise<Specification[]> {
		return this.repository.find();
	}

	public async findByProp(prop: keyof Specification, value: Specification[keyof Specification]): Promise<Specification | undefined> {
		return this.repository.findOne({ where: { [prop]: value } });
	}
}