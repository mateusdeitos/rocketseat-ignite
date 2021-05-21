import { IBaseRepository } from "@shared/repositories/IBaseRepository";
import { Category } from "../infra/typeorm/entities/Category";

export type ICreateCategoryDTO = {
	name: string;
	description: string;
}

export interface ICategoriesRepository extends IBaseRepository<Category> {
	create(data: ICreateCategoryDTO): Promise<void>;
	list(): Promise<Category[]>;
}