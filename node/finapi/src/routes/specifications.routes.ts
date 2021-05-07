import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification.ts';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications';

export const specificationsRoutes = Router();

specificationsRoutes.get('/specifications', async (request, response) => {
	return listSpecificationsController.handle(request, response);
})

specificationsRoutes.post('/specifications', async (request, response) => {
	return createSpecificationController.handle(request, response);
})

