import { Specification } from "../model/Specification";

export type ICreateSpecificationDTO = {
	name: string;
	description: string;
}

export interface ISpecificationsRepository {
	findByProp(prop: keyof Specification, value: Specification[keyof Specification]): Promise<Specification|undefined>;
	create(data: ICreateSpecificationDTO): Promise<void>;
	list(): Promise<Specification[]>;
}