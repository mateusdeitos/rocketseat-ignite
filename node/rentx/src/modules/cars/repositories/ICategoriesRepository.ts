import { Category } from "../entities/Category";

export type ICreateCategoryDTO = {
	name: string;
	description: string;
}

export interface ICategoriesRepository {
	findByProp(prop: keyof Category, value: Category[keyof Category]): Promise<Category | undefined>;
	create(data: ICreateCategoryDTO): Promise<void>;
	list(): Promise<Category[]>;
}