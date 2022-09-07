import { Router } from 'express';
import multer from 'multer';

import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController,
} from '../modules/cars/useCases';

const upload = multer({ dest: './tmp' });

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories', listCategoriesController.handle);
categoriesRoutes.post('/categories', createCategoryController.handle);
categoriesRoutes.post(
  '/categories/import',
  upload.single('file'),
  importCategoriesController.handle
);
