import { Router } from 'express';

import { createSpecificationController, listSpecificationsController } from '@/cars/useCases';
import { ensureAuthenticatedMiddleware } from '~/middlewares';

export const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticatedMiddleware());

specificationsRoutes.get('/specifications', listSpecificationsController.handle);
specificationsRoutes.post('/specifications', createSpecificationController.handle);
