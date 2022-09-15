import { Router } from 'express';
import multer from 'multer';

import { authMiddleware } from '../middlewares';
import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController,
} from '../modules/cars/useCases';

const upload = multer({ dest: './tmp' });

export const categoriesRoutes = Router();

categoriesRoutes.use(authMiddleware());

categoriesRoutes.get('/categories', listCategoriesController.handle);
categoriesRoutes.post('/categories', createCategoryController.handle);
categoriesRoutes.post(
  '/categories/import',
  upload.single('file'),
  importCategoriesController.handle
);
