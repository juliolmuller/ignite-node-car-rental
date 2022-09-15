import { Router } from 'express';

import { authMiddleware } from '../middlewares';
import {
  createSpecificationController,
  listSpecificationsController,
} from '../modules/cars/useCases';

export const specificationsRoutes = Router();

specificationsRoutes.use(authMiddleware());

specificationsRoutes.get('/specifications', listSpecificationsController.handle);
specificationsRoutes.post('/specifications', createSpecificationController.handle);
