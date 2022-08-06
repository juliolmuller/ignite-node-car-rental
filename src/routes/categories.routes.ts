import { Router } from 'express';
import { v4 as uuid } from 'uuid';

export const categoriesRoutes = Router();

const categories: any[] = [];

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body;
  const category = {
    id: uuid(),
    name,
    description,
  };

  categories.push(category);
  response.status(201).json(category);
});
