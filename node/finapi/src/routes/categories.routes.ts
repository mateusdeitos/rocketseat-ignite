import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { ICreateCategoryDTO } from '../modules/cars/repositories/ICategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

export const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/categories', async (request, response) => {
	const categories = await categoriesRepository.list();
	return response.json(categories);
})

categoriesRoutes.post('/categories', async (request, response) => {
	const { name, description } = request.body as ICreateCategoryDTO;
	const createCategoryService = new CreateCategoryService(categoriesRepository);
	await createCategoryService.execute({ name, description });
	return response.status(201).send();
})

