import { Router } from 'express';
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';

export const sessionRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

sessionRoutes.post('/', authenticateUserController.handle);


