import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';

import './container';
import { authRoutes, categoriesRoutes, specificationsRoutes, usersRoutes } from './routes';
import swaggerConfig from './swagger.json';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swagger.serve, swagger.setup(swaggerConfig));

app.use('/api/v1', authRoutes);
app.use('/api/v1', categoriesRoutes);
app.use('/api/v1', specificationsRoutes);
app.use('/api/v1', usersRoutes);
