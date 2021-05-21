import { IBaseRepository } from "@shared/repositories/IBaseRepository";
import { Car } from "../infra/typeorm/entities/Car";

export type ICreateCarDTO = Omit<Car, 'id' | 'created_at' | 'available'>

export interface ISearchFilters {
	q?: string;
	limit?: number;
	offset?: number;
}
export interface ICarsRepository extends IBaseRepository<Car> {
	create(data: ICreateCarDTO): Promise<Car>;
	list(filters?: ISearchFilters): Promise<Car[]>;
}