import { ICarsRepository, ICreateCarDTO, ISearchFilters } from "@modules/cars/repositories/ICarsRepository";
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
	async list({ limit: take, offset: skip, q: pesquisa }: ISearchFilters): Promise<Car[]> {
		if (!pesquisa) {
			return this.repository.find({ skip, take, relations: ['specifications', 'category', 'images'] });
		}

		return this.repository
			.createQueryBuilder('cars')
			.innerJoinAndSelect('cars.category', 'category')
			.leftJoinAndSelect('cars.images', 'images')
			.leftJoinAndSelect('cars.specifications', 'specifications')
			.where(new Brackets(sql => {
				sql
					.where('cars.name like :name', { name: `%${pesquisa}%` })
					.orWhere('cars.description like :description', { description: `%${pesquisa}%` })
					.orWhere('category.name like :categoryName', { categoryName: `%${pesquisa}%` })
			}))
			.skip(skip)
			.take(take)
			.getMany()
	}

	async updateProp(id: string, prop: keyof Car, value: Car[keyof Car]): Promise<void> {
		await this.repository.update(id, { [prop]: value });
	}
}