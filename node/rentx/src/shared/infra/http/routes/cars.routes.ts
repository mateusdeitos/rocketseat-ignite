import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { ListCarsController } from '@modules/cars/useCases/listCars/listCarsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/createCarSpecificationController';

export const carsRoutes = Router();
const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listCarsController = new ListCarsController();
carsRoutes.get('/', ensureAuthenticated, listCarsController.handle);
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.post('/:id/specifications', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
