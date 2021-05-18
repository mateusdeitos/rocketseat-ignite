import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { ListCarsController } from '@modules/cars/useCases/listCars/listCarsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

export const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
carsRoutes.get('/', ensureAuthenticated, listCarsController.handle);
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
