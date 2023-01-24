import { Router } from 'express';
import multer from 'multer';

import { authMiddleware } from '../middlewares';
import { createUserController, updateUserAvatarController } from '../modules/auth/useCases';

const upload = multer({ dest: './tmp/avatar' });

export const usersRoutes = Router();

usersRoutes.use(authMiddleware());

usersRoutes.post('/users', createUserController.handle);
usersRoutes.patch('/users/avatar', upload.single('file'), updateUserAvatarController.handle);
