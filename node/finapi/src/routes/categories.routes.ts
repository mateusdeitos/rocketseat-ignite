import { request, Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory/index';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories', async (request, response) => {
	return listCategoriesController.handle(request, response);
})

categoriesRoutes.post('/categories', async (request, response) => {
	return createCategoryController.handle(request, response);
})

