import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalsController } from '@modules/rentals/useCases/createRental/CreateRentalsController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

export const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);
rentalsRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle);
rentalsRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);
