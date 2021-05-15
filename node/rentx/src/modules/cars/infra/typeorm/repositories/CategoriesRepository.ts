import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";


export class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	constructor() {
		this.repository = getRepository(Category)
	}

	public async create({ description, name }: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create({ description, name });
		await this.repository.save(category);
	}

	public async list(): Promise<Category[]> {
		const categories = await this.repository.find();
		return categories;
	}

	public async findByProp(prop: keyof Category, value: Category[keyof Category]): Promise<Category | undefined> {
		return this.repository.findOne({ where: { [prop]: value } });
	}
}