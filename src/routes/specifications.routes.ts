import { Router } from 'express';

import { createSpecificationController, listSpecificationsController } from '@/cars/useCases';
import { ensureAuth } from '~/middlewares';

export const specificationsRoutes = Router();

specificationsRoutes.get('/cars/specifications', ensureAuth(), listSpecificationsController.handle);
specificationsRoutes.post(
  '/cars/specifications',
  ensureAuth(),
  createSpecificationController.handle
);
