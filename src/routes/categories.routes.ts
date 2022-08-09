import { Router } from 'express';

import categoriesRepository from '../repositories/categories.repository';

export const categoriesRoutes = Router();

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body;
  const category = categoriesRepository.create({ name, description });

  response.status(201).json(category);
});
