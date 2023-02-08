import { Router } from 'express';

import { createRentalController } from '@/rentals/useCases';
import { ensureAuth } from '~/middlewares';

export const rentalsRoutes = Router();

rentalsRoutes.post('/rentals', ensureAuth(), createRentalController.handle);
