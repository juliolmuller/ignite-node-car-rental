import { Router } from 'express';

import { InMemoryCategoriesRepository } from '../domains/cars/repositories';
import { CreateCategoryService, ListCategoriesService } from '../domains/cars/services';

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories', (request, response) => {
  const categoriesRepository = InMemoryCategoriesRepository.getInstance();
  const listCategoriesService = new ListCategoriesService(categoriesRepository);
  const categories = listCategoriesService.execute();

  return response.status(200).json(categories);
});

categoriesRoutes.post('/categories', (request, response) => {
  const categoriesRepository = InMemoryCategoriesRepository.getInstance();
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  const category = createCategoryService.execute(request.body);

  response.status(201).json(category);
});
