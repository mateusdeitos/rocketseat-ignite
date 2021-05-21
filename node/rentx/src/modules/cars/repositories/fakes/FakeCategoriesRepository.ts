import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


export class FakeCategoriesRepository implements ICategoriesRepository {
	private categories: Category[];
	private static INSTANCE: FakeCategoriesRepository;

	public constructor() {
		this.categories = [];
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			return new FakeCategoriesRepository();
		}

		return this.INSTANCE;
	}

	async list(): Promise<Category[]> {
		return this.categories;
	}

	async findByProp(prop: keyof Category, value: Category[keyof Category]): Promise<Category | undefined> {
		return this.categories.find(c => c[prop] === value);
	}

	async create({ description, name }: ICreateCategoryDTO): Promise<void> {
		const category = new Category();
		Object.assign(category, { name, description });
		this.categories.push(category);
	}

	async updateProp(id: string, prop: keyof Category, value: Category[keyof Category]): Promise<void> {
		const index = this.categories.findIndex(c => c.id === id);
		if (index >= 0) {
			this.categories[index] = {
				...this.categories[index],
				[prop]: value
			}
		}
	}
}