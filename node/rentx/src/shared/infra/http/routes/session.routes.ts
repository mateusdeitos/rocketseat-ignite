import { Router } from 'express';
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';
import { SendForgotPasswordController } from '@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/users/useCases/resetPassword/ResetPasswordController';

export const sessionRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

sessionRoutes.post('/', authenticateUserController.handle);
sessionRoutes.post("/refresh-token", refreshTokenController.handle);
sessionRoutes.post("/forgot-password", sendForgotPasswordController.handle);
sessionRoutes.post("/reset-password", resetPasswordController.handle);
