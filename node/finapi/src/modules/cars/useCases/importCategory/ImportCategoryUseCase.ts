import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";



export class ImportCategoryUseCase {
	constructor(private categoriesRepository: ICategoriesRepository){}
	public async execute(file: Express.Multer.File) {
		console.log(file);
	}
}