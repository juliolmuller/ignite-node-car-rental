import { Router } from 'express';

import { authMiddleware } from '../middlewares';
import { createUserController } from '../modules/auth/useCases';

export const usersRoutes = Router();

usersRoutes.use(authMiddleware());

usersRoutes.post('/users', createUserController.handle);
