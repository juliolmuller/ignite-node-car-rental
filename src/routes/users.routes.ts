import { Router } from 'express';

import { createUserController } from '../modules/auth/useCases';

export const usersRoutes = Router();

usersRoutes.post('/users', createUserController.handle);
