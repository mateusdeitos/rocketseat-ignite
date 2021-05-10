import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


export class SpecificationsRepository implements ISpecificationsRepository {
	private specifications: Specification[];
	private static INSTANCE: SpecificationsRepository;
	private constructor() { this.specifications = [] }

	// Útil para ter apenas 1 instância da classe, padrão singleton
	public static getInstance(): SpecificationsRepository {
		if (!SpecificationsRepository.INSTANCE) {
			SpecificationsRepository.INSTANCE = new SpecificationsRepository();
		}

		return SpecificationsRepository.INSTANCE;
	}

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