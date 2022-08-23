import { Router } from 'express';

import {
  createSpecificationController,
  listSpecificationsController,
} from '../domains/cars/useCases';

export const specificationsRoutes = Router();

specificationsRoutes.get('/specifications', listSpecificationsController.handle);
specificationsRoutes.post('/specifications', createSpecificationController.handle);