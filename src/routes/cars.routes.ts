import { Router } from 'express';

import { createCarController, listAvailableCarsController } from '@/cars/useCases';
import { ensureAdmin, ensureAuth } from '~/middlewares';

export const carsRoutes = Router();

carsRoutes.get('/cars/available', listAvailableCarsController.handle);
carsRoutes.post('/cars', ensureAuth(), ensureAdmin(), createCarController.handle);
