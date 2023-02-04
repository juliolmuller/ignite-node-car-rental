import { Router } from 'express';
import multer from 'multer';

import {
  assignCarSpecificationsController,
  createCarController,
  listCarsController,
  uploadCarImagesController,
} from '@/cars/useCases';
import { uploadConfig } from '~/config';
import { ensureAdmin, ensureAuth } from '~/middlewares';

const uploadMiddleware = multer(uploadConfig.prefixed(process.env.STORAGE_CAR_IMAGES_PATH));

export const carsRoutes = Router();

carsRoutes.get('/cars', listCarsController.handle);
carsRoutes.post('/cars', ensureAuth(), ensureAdmin(), createCarController.handle);
carsRoutes.patch(
  '/cars/:carId/specifications',
  ensureAuth(),
  ensureAdmin(),
  assignCarSpecificationsController.handle
);
carsRoutes.patch(
  '/cars/:carId/images',
  ensureAuth(),
  ensureAdmin(),
  uploadMiddleware.array('file'),
  uploadCarImagesController.handle
);
