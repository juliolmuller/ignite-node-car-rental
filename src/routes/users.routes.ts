import { Router } from 'express';
import multer from 'multer';

import { createUserController, updateUserAvatarController } from '@/users/useCases';
import { uploadConfig } from '~/config';
import { ensureAuth } from '~/middlewares';

const uploadMiddleware = multer(uploadConfig.prefixed(process.env.STORAGE_AVATAR_PATH));

export const usersRoutes = Router();

usersRoutes.post('/users', ensureAuth(), createUserController.handle);
usersRoutes.patch(
  '/users/avatar',
  ensureAuth(),
  uploadMiddleware.single('file'),
  updateUserAvatarController.handle
);
