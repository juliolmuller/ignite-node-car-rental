import { Router } from 'express';

import { createSpecificationController, listSpecificationsController } from '@/cars/useCases';
import { authMiddleware } from '~/middlewares';

export const specificationsRoutes = Router();

specificationsRoutes.use(authMiddleware());

specificationsRoutes.get('/specifications', listSpecificationsController.handle);
specificationsRoutes.post('/specifications', createSpecificationController.handle);
