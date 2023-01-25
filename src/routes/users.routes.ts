import { Router } from 'express';
import multer from 'multer';

import { createUserController, updateUserAvatarController } from '@/auth/useCases';
import { uploadConfig } from '~/config';
import { authMiddleware } from '~/middlewares';

const uploadMiddleware = multer(uploadConfig.prefixed(process.env.STORAGE_AVATAR_PATH));

export const usersRoutes = Router();

usersRoutes.use(authMiddleware());

usersRoutes.post('/users', createUserController.handle);
usersRoutes.patch(
  '/users/avatar',
  uploadMiddleware.single('file'),
  updateUserAvatarController.handle
);
