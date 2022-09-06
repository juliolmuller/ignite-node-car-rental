import { prisma } from '../../../database';
import { Category } from '../models';
import { ICategoriesRepository, ICreateCategoryDTO } from './interfaces';

export class PrismaCategoriesRepository implements ICategoriesRepository {
  // eslint-disable-next-line no-use-before-define
  private static SINGLETON: PrismaCategoriesRepository;

  private constructor() {
    // no actions
  }

  static getInstance(): PrismaCategoriesRepository {
    if (!PrismaCategoriesRepository.SINGLETON) {
      PrismaCategoriesRepository.SINGLETON = new PrismaCategoriesRepository();
    }

    return PrismaCategoriesRepository.SINGLETON;
  }

  list(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  async find(id: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: { id },
    });

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
