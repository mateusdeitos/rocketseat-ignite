import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";


export class CategoriesRepository implements ICategoriesRepository {
	private categories: Category[];

	constructor() { this.categories = [] }

	public async create({ description, name }: ICreateCategoryDTO): Promise<void> {
		const category = new Category();
		Object.assign(category, {
			name,
			description
		})
		this.categories.push(category);
	}

	public async list(): Promise<Category[]> {
		return this.categories;
	}

	public async findByProp(prop: keyof Category, value: Category[keyof Category]): Promise<Category | undefined> {
		return this.categories.find(cat => cat[prop] === value);
	}
}