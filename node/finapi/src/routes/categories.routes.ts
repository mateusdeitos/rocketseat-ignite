import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

export const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/categories', async (request, response) => {
	const categories = await categoriesRepository.list();
	return response.json(categories);
})

categoriesRoutes.post('/categories',  async (request, response) => {
	const { name, description } = request.body as { name: string, description: string };
	const createCategoryService = new CreateCategoryService(categoriesRepository);
	await createCategoryService.execute({name, description});
	return response.status(201).send();
})

