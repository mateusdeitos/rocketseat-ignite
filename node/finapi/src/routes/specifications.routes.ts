import { Router } from 'express';
import { ICreateSpecificationDTO } from '../modules/cars/repositories/ISpecificationsRepository';
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

export const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.get('/specifications', async (request, response) => {
	const specifications = await specificationsRepository.list();
	return response.json(specifications);
})

specificationsRoutes.post('/specifications', async (request, response) => {
	const { name, description } = request.body as ICreateSpecificationDTO;
	const createSpecificationService = new CreateSpecificationService(specificationsRepository);
	await createSpecificationService.execute({ name, description });
	return response.status(201).send();
})

