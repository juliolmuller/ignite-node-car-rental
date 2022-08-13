import { Router } from 'express';

import { InMemorySpecificationsRepository } from '../domains/cars/repositories';
import { CreateSpecificationService, ListSpecificationsService } from '../domains/cars/services';

export const specificationsRoutes = Router();

specificationsRoutes.get('/specifications', (request, response) => {
  const specificationsRepository = InMemorySpecificationsRepository.getInstance();
  const listSpecificationsService = new ListSpecificationsService(specificationsRepository);
  const specifications = listSpecificationsService.execute();

  return response.status(200).json(specifications);
});

specificationsRoutes.post('/specifications', (request, response) => {
  const specificationsRepository = InMemorySpecificationsRepository.getInstance();
  const createSpecificationService = new CreateSpecificationService(specificationsRepository);
  const specification = createSpecificationService.execute(request.body);

  response.status(201).json(specification);
});
