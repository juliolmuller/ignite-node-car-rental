import { Router } from 'express';

import { authenticateController } from '@/auth/useCases';

export const authRoutes = Router();

authRoutes.post('/auth', authenticateController.handle);
