import { Car } from "../infra/typeorm/entities/Car";

export type ICreateCarDTO = Omit<Car, 'id' | 'created_at' | 'available'>

export interface ICarsRepository {
	findByProp(prop: keyof Car, value: Car[keyof Car]): Promise<Car | undefined>;
	create(data: ICreateCarDTO): Promise<Car>;
	list(pesquisa?: string): Promise<Car[]>;
}