import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from "tsyringe";
import { TOKEN_CATEGORY_REPOSITORY } from "../../../../shared/container";

interface IImportCategory {
	name: string;
	description: string;
}
@injectable()
export class ImportCategoryUseCase {
	constructor(
		@inject(TOKEN_CATEGORY_REPOSITORY)
		private categoriesRepository: ICategoriesRepository
	) { }

	private async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const categories: IImportCategory[] = [];

			const parseFile = csvParse({
				delimiter: ",",
			})

			// Irá ler o arquivo e armazenar no parseFile
			stream.pipe(parseFile);

			parseFile
				.on('data', async (line) => {
					const [name, description] = line;
					categories.push({ name, description });
				})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("error", (error) => reject(error));
		})
	}

	public async execute(file: Express.Multer.File) {
		const categories = await this.loadCategories(file);
		categories.map(async ({ name, description }) => {
			const exists = await this.categoriesRepository.findByProp('name', name);
			if (!exists) {
				await this.categoriesRepository.create({ name, description });
			}
		})
	}
}