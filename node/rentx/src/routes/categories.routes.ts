import { request, Router } from 'express';
import createCategoryController from '../modules/cars/useCases/createCategory/index';
import listCategoriesController from '../modules/cars/useCases/listCategories';
import multer from 'multer';
import importCategoryController from '../modules/cars/useCases/importCategory';

const upload = multer({
	dest: "./tmp",
})

export const categoriesRoutes = Router();

categoriesRoutes.get('/', async (request, response) => {
	return listCategoriesController().handle(request, response);
})

categoriesRoutes.post('/', async (request, response) => {
	return createCategoryController().handle(request, response);
})

categoriesRoutes.post('/import', upload.single("file"), async (request, response) => {
	return importCategoryController().handle(request, response);
})

