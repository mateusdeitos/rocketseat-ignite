import { Category } from "../model/Category";

type ICreateCategoryDTO = {
	name: string;
	description: string;
}

export class CategoriesRepository {
	private categories: Category[];

	constructor() { this.categories = [] }

	create({ description, name }: ICreateCategoryDTO): void {
		const category = new Category();
		Object.assign(category, {
			name,
			description
		})
		this.categories.push(category);
	}

	list(): Category[] {
		return this.categories;
	}

	findByProp(prop: keyof ICreateCategoryDTO, value: ICreateCategoryDTO[keyof ICreateCategoryDTO]) {
		return this.categories.find(cat => cat[prop] === value);
	}
}