import { Category } from "../model/Category";

export type ICreateCategoryDTO = {
	name: string;
	description: string;
}

export interface ICategoriesRepository {
	findByProp(prop: keyof ICreateCategoryDTO, value: ICreateCategoryDTO[keyof ICreateCategoryDTO]): Promise<Category | undefined>;
	create(data: ICreateCategoryDTO): Promise<void>;
	list(): Promise<Category[]>;
}