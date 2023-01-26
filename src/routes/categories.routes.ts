import { Router } from 'express';
import multer from 'multer';

import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController,
} from '@/cars/useCases';
import { uploadConfig } from '~/config';
import { ensureAuthenticatedMiddleware } from '~/middlewares';

const uploadMiddleware = multer(uploadConfig.hash(process.env.STORAGE_TEMP_PATH));

export const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthenticatedMiddleware());

categoriesRoutes.get('/cars/categories', listCategoriesController.handle);
categoriesRoutes.post('/cars/categories', createCategoryController.handle);
categoriesRoutes.post(
  '/cars/categories/import',
  uploadMiddleware.single('file'),
  importCategoriesController.handle
);
