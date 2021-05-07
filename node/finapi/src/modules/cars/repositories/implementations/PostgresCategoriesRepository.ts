import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";


export class PostgresCategoriesRepository implements ICategoriesRepository {
	public async findByProp(prop: keyof Category, value: Category[keyof Category]): Promise<Category> {
		throw new Error("Method not implemented.");
	}
	public async create(data: ICreateCategoryDTO): Promise<void> {
		throw new Error("Method not implemented.");
	}
	public async list(): Promise<Category[]> {
		throw new Error("Method not implemented.");
	}

}