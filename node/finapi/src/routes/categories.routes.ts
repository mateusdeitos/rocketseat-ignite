import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/categories', (request, response) => {
	return response.json(categoriesRepository.list());
})

categoriesRoutes.post('/categories', (request, response) => {
	const { name, description } = request.body as { name: string, description: string };

	const categoryExists = categoriesRepository.findByProp('name', name);

	if (categoryExists) {
		return response.status(400).json({ error: "Category already exists" });
	}

	categoriesRepository.create({ name, description });

	return response.status(201).send();
})

