import 'reflect-metadata';
import { container } from 'tsyringe';

import {
  ICategoriesRepository,
  ISpecificationsRepository,
  PrismaCategoriesRepository,
  PrismaSpecificationsRepository,
} from '@/cars/repositories';
import { IUsersRepository, PrismaUsersRepository } from '@/users/repositories';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PrismaCategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  PrismaSpecificationsRepository
);

container.registerSingleton<IUsersRepository>('UsersRepository', PrismaUsersRepository);
