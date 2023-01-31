import { Router } from 'express';

import { createCarController } from '@/cars/useCases';
import { ensureAuth } from '~/middlewares';

export const carsRoutes = Router();

carsRoutes.post('/cars', ensureAuth(), createCarController.handle);
