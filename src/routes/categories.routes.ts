import { Router } from 'express';
import multer from 'multer';

import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController,
} from '@/cars/useCases';
import { uploadConfig } from '~/config';
import { authMiddleware } from '~/middlewares';

const uploadMiddleware = multer(uploadConfig.hash(process.env.STORAGE_TEMP_PATH));

export const categoriesRoutes = Router();

categoriesRoutes.use(authMiddleware());

categoriesRoutes.get('/categories', listCategoriesController.handle);
categoriesRoutes.post('/categories', createCategoryController.handle);
categoriesRoutes.post(
  '/categories/import',
  uploadMiddleware.single('file'),
  importCategoriesController.handle
);
