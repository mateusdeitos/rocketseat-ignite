import { Router } from 'express';
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';

export const sessionRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
sessionRoutes.post('/', authenticateUserController.handle);
sessionRoutes.post("/refresh-token", refreshTokenController.handle);

