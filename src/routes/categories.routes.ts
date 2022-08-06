import { Router } from 'express';

export const categoriesRoutes = Router();

const categories: any[] = [];

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body;
  const category = {
    id: categories.reduce((lastId, { id }) => Math.max(lastId, id), 0) + 1,
    name,
    description,
  };

  categories.push(category);
  response.status(201).json(category);
});
