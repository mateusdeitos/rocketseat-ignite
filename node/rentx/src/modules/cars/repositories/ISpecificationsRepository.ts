import { Specification } from "../infra/typeorm/entities/Specification";

export type ICreateSpecificationDTO = {
	name: string;
	description: string;
}

export interface ISpecificationsRepository {
	findByProp(prop: keyof Specification, value: Specification[keyof Specification]): Promise<Specification | undefined>;
	findByIds(ids: string[]): Promise<Specification[]>;
	create(data: ICreateSpecificationDTO): Promise<void>;
	list(): Promise<Specification[]>;
}