import { Router } from 'express';

import { authenticateController } from '../modules/auth/useCases';

export const authRoutes = Router();

authRoutes.post('/auth', authenticateController.handle);
