import { Router } from 'express';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from 'multer';
import { upload } from '@config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { UserProfileController } from '@modules/users/useCases/profile/UserProfileController';

export const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

const uploadAvatar = multer(upload);

usersRoutes.get('/:id', userProfileController.handle);
usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);
