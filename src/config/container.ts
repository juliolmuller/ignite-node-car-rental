import 'reflect-metadata';
import { container } from 'tsyringe';

import {
  ICarsRepository,
  ICategoriesRepository,
  ISpecificationsRepository,
  PrismaCarsRepository,
  PrismaCategoriesRepository,
  PrismaSpecificationsRepository,
} from '@/cars/repositories';
import { IRentalsRepository, PrismaRentalsRepository } from '@/rentals/repositories';
import { IUsersRepository, PrismaUsersRepository } from '@/users/repositories';

container.registerSingleton<ICarsRepository>('CarsRepository', PrismaCarsRepository);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PrismaCategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  PrismaSpecificationsRepository
);

container.registerSingleton<IRentalsRepository>('RentalsRepository', PrismaRentalsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', PrismaUsersRepository);
