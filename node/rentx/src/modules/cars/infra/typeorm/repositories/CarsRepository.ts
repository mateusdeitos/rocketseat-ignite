import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";
import { Category } from "../entities/Category";


export class CarsRepository implements ICarsRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = getRepository(Car);
	}
	async findByProp(prop: keyof Car, value: string | number | boolean | Category | Date): Promise<Car | undefined> {
		return this.repository.findOne({ where: { [prop]: value } });
	}
	async create(data: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({ ...data, available: true });
		return this.repository.save(car);
	}
	list(): Promise<Car[]> {
		return this.repository.find();
	}

}