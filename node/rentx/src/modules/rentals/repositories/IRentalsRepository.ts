import { Rental } from "../infra/typeorm/entities/Rental";

export type ICreateRentalDTO = Pick<Rental, 'car_id' | 'user_id' | 'expected_return_date'>

export interface IRentalsRepository {
	create(data: ICreateRentalDTO): Promise<Rental>;
	findByProp(prop: keyof Rental, value: Rental[keyof Rental]): Promise<Rental | undefined>;
	findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
	findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
}