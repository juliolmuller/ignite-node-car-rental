import { Router } from 'express';
import multer from 'multer';

import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController,
} from '@/cars/useCases';
import { uploadConfig } from '~/config';
import { ensureAdmin, ensureAuth } from '~/middlewares';

const uploadMiddleware = multer(uploadConfig.hash(process.env.STORAGE_TEMP_PATH));

export const categoriesRoutes = Router();

categoriesRoutes.get('/cars/categories', ensureAuth(), listCategoriesController.handle);
categoriesRoutes.post(
  '/cars/categories',
  ensureAuth(),
  ensureAdmin(),
  createCategoryController.handle
);
categoriesRoutes.post(
  '/cars/categories/import',
  ensureAuth(),
  ensureAdmin(),
  uploadMiddleware.single('file'),
  importCategoriesController.handle
);
