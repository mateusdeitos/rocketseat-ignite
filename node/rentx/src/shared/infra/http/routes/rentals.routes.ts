import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalsController } from '@modules/rentals/useCases/createRental/CreateRentalsController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

export const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);
rentalsRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);
