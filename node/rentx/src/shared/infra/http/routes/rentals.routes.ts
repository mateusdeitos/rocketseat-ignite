import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalsController } from '@modules/rentals/useCases/CreateRentalsController';

export const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);
