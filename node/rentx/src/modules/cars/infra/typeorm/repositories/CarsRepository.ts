import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { Brackets, getRepository, Repository } from "typeorm";
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
	async list(pesquisa?: string): Promise<Car[]> {
		if (!pesquisa) {
			return this.repository.find();
		}

		return this.repository
			.createQueryBuilder('cars')
			.innerJoin('cars.category', 'category')
			.where(new Brackets(sql => {
				sql
					.where('cars.name like :name', { name: `%${pesquisa}%` })
					.orWhere('cars.description like :description', { description: `%${pesquisa}%` })
					.orWhere('category.name like :categoryName', { categoryName: `%${pesquisa}%` })
			}))
			.getMany()
	}

}