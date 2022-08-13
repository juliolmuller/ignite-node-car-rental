import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { categoriesRoutes, specificationsRoutes } from './routes';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(categoriesRoutes);
app.use(specificationsRoutes);
