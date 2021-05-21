import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateRentalDTO, IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { getRepository, IsNull, Repository } from "typeorm";
import { Rental } from "./entities/Rental";


export class RentalsRepository implements IRentalsRepository {
	private repository: Repository<Rental>;

	constructor() {
		this.repository = getRepository(Rental);
	}
	public async create(data: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create(data);
		return this.repository.save(rental);
	}
	public async findByProp(prop: keyof Rental, value: Rental[keyof Rental]): Promise<Rental | undefined> {
		return this.repository.findOne({ where: { [prop]: value } });
	}
	public async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
		return this.repository.findOne({ where: { car_id, end_date: IsNull() } })
	}
	public async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
		return this.repository.findOne({ where: { user_id, end_date: IsNull() } })
	}
	public async findRentalByUser(user_id: string): Promise<Rental[]> {
		return this.repository.find({ where: { user_id } })
	}
	public async updateProp(id: string, prop: keyof Rental, value: Rental[keyof Rental]): Promise<void> {
		await this.repository.update(id, { [prop]: value });
	}

}