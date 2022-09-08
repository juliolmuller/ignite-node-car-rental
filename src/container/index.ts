import 'reflect-metadata';
import { container } from 'tsyringe';

import {
  ICategoriesRepository,
  ISpecificationsRepository,
  PrismaCategoriesRepository,
  PrismaSpecificationsRepository,
} from '../modules/cars/repositories';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PrismaCategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  PrismaSpecificationsRepository
);
