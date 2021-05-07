import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "./ISpecificationsRepository";


export class PostgresSpecificationsRepository implements ISpecificationsRepository {
	public async findByProp(prop: keyof Specification, value: Specification[keyof Specification]): Promise<Specification> {
		throw new Error("Method not implemented.");
	}
	public async create(data: ICreateSpecificationDTO): Promise<void> {
		throw new Error("Method not implemented.");
	}
	public async list(): Promise<Specification[]> {
		throw new Error("Method not implemented.");
	}

}