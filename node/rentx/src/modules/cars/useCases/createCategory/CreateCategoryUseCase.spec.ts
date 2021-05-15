import { FakeCategoriesRepository } from "../../repositories/fakes/FakeCategoriesRepository"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { validate } from 'uuid'
import { AppError } from "@errors/AppError";

describe('Create Category', () => {
	let fakeCategoriesRepository: FakeCategoriesRepository;
	let createCategoryUseCase: CreateCategoryUseCase;

	beforeEach(() => {
		fakeCategoriesRepository = new FakeCategoriesRepository()
		createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
	})

	it('Should be able to create a category', async () => {
		await createCategoryUseCase.execute({
			name: 'Teste',
			description: 'Teste descrição'
		});

		const category = await fakeCategoriesRepository.findByProp('name', 'Teste');

		expect(validate(category.id)).toBe(true);

		expect(category).toMatchObject({
			name: 'Teste',
			description: 'Teste descrição',
		})

	});

	it('Should not be able to create 2 categories with same name', async () => {
		await expect(async () => {
			await createCategoryUseCase.execute({
				name: 'Teste',
				description: 'Teste descrição'
			});
			await createCategoryUseCase.execute({
				name: 'Teste',
				description: 'Teste descrição'
			});
		}).rejects.toBeInstanceOf(AppError);
	})
})