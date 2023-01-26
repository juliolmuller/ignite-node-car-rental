import { Router } from 'express';

import { createCarController } from '@/cars/useCases';
import { ensureAuthenticatedMiddleware } from '~/middlewares';

export const carsRoutes = Router();

carsRoutes.use(ensureAuthenticatedMiddleware());

carsRoutes.post('/cars', createCarController.handle);
