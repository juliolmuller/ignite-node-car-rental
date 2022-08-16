import { Router } from 'express';

import { createCategoryController, listCategoriesController } from '../domains/cars/useCases';

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories', listCategoriesController.handle);
categoriesRoutes.post('/categories', createCategoryController.handle);
