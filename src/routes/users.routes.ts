import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../config';
import { authMiddleware } from '../middlewares';
import { createUserController, updateUserAvatarController } from '../modules/auth/useCases';

const uploadMiddleware = multer(uploadConfig.prefixed(process.env.STORAGE_AVATAR_PATH));

export const usersRoutes = Router();

usersRoutes.use(authMiddleware());

usersRoutes.post('/users', createUserController.handle);
usersRoutes.patch(
  '/users/avatar',
  uploadMiddleware.single('file'),
  updateUserAvatarController.handle
);
