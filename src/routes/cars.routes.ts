import { Router } from 'express';

import { createCarController } from '@/cars/useCases';
import { ensureAdmin, ensureAuth } from '~/middlewares';

export const carsRoutes = Router();

carsRoutes.post('/cars', ensureAuth(), ensureAdmin(), createCarController.handle);
