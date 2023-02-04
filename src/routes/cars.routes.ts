import { Router } from 'express';

import {
  assignCarSpecificationsController,
  createCarController,
  listCarsController,
} from '@/cars/useCases';
import { ensureAdmin, ensureAuth } from '~/middlewares';

export const carsRoutes = Router();

carsRoutes.get('/cars', listCarsController.handle);
carsRoutes.post('/cars', ensureAuth(), ensureAdmin(), createCarController.handle);
carsRoutes.patch(
  '/cars/:carId/specifications',
  ensureAuth(),
  ensureAdmin(),
  assignCarSpecificationsController.handle
);
