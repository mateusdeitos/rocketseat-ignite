import { IBaseRepository } from "@shared/repositories/IBaseRepository";
import { Rental } from "../infra/typeorm/entities/Rental";

export type ICreateRentalDTO = Pick<Rental, 'car_id' | 'user_id' | 'expected_return_date'>

export interface IRentalsRepository extends IBaseRepository<Rental>{
	create(data: ICreateRentalDTO): Promise<Rental>;
	findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
	findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
	findRentalByUser(user_id: string): Promise<Rental[]>;
}