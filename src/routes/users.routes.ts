import { Router } from 'express';
import multer from 'multer';

import { createUserController, updateUserAvatarController } from '@/users/useCases';
import { uploadConfig } from '~/config';
import { ensureAuthenticatedMiddleware } from '~/middlewares';

const uploadMiddleware = multer(uploadConfig.prefixed(process.env.STORAGE_AVATAR_PATH));

export const usersRoutes = Router();

usersRoutes.use(ensureAuthenticatedMiddleware());

usersRoutes.post('/users', createUserController.handle);
usersRoutes.patch(
  '/users/avatar',
  uploadMiddleware.single('file'),
  updateUserAvatarController.handle
);
