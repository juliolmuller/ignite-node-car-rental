import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUsersRepository, PrismaUsersRepository } from '../modules/auth/repositories';
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

container.registerSingleton<IUsersRepository>('UsersRepository', PrismaUsersRepository);
