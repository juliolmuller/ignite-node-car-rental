import { validate } from 'uuid';

import { Category } from '@/cars/models';
import { prisma } from '~/database';

import { ICategoriesRepository, ICreateCategoryDTO } from './interfaces';

export class PrismaCategoriesRepository implements ICategoriesRepository {
  list(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  async find(id: string): Promise<Category | null> {
    const isUuidValid = validate(id);
    const category = isUuidValid && (await prisma.category.findFirst({ where: { id } }));

    return category || null;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: { name },
    });

    return category || null;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = await prisma.category.create({
      data: { name, description },
    });

    return category;
  }
}
