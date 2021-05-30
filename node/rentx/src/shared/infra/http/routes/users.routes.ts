import { Router } from 'express';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from 'multer';
import { upload } from '@config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(upload);

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);
