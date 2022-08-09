import { Router } from 'express';

import categoriesRepository from '../repositories/categories.repository';
import CreateCategoryService from '../services/CreateCategory.service';
import ListCategoriesService from '../services/ListCategories.service';

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories', (request, response) => {
  const listCategoriesService = new ListCategoriesService(categoriesRepository);
  const categories = listCategoriesService.execute();

  return response.status(200).json(categories);
});

categoriesRoutes.post('/categories', (request, response) => {
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  const category = createCategoryService.execute(request.body);

  response.status(201).json(category);
});
