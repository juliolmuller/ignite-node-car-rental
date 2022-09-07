import { prisma } from '../../../database';
import { Specification } from '../models';
import { ISpecificationsRepository, ICreateSpecificationDTO } from './interfaces';

export class PrismaSpecificationsRepository implements ISpecificationsRepository {
  // eslint-disable-next-line no-use-before-define
  private static SINGLETON: PrismaSpecificationsRepository;

  private constructor() {
    // no actions
  }

  static getInstance(): PrismaSpecificationsRepository {
    if (!PrismaSpecificationsRepository.SINGLETON) {
      PrismaSpecificationsRepository.SINGLETON = new PrismaSpecificationsRepository();
    }

    return PrismaSpecificationsRepository.SINGLETON;
  }

  list(): Promise<Specification[]> {
    return prisma.specification.findMany();
  }

  async find(id: string): Promise<Specification | null> {
    const specification = await prisma.specification.findFirst({
      where: { id },
    });

    return specification || null;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await prisma.specification.findFirst({
      where: { name },
    });

    return specification || null;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await prisma.specification.create({
      data: { name, description },
    });

    return specification;
  }
}
