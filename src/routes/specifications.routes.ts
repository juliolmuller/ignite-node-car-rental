import { Router } from 'express';

import { createSpecificationController, listSpecificationsController } from '@/cars/useCases';
import { ensureAuthenticatedMiddleware } from '~/middlewares';

export const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticatedMiddleware());

specificationsRoutes.get('/cars/specifications', listSpecificationsController.handle);
specificationsRoutes.post('/cars/specifications', createSpecificationController.handle);
