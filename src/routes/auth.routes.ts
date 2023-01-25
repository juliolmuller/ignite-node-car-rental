import { Router } from 'express';

import { authenticateController } from '@/users/useCases';

export const authRoutes = Router();

authRoutes.post('/auth', authenticateController.handle);
