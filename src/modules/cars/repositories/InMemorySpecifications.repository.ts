import { Specification } from '@/cars/models';

import { ISpecificationsRepository, ICreateSpecificationDTO } from './interfaces';

export class InMemorySpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async find(id: string): Promise<Specification | undefined> {
    const specification = this.specifications.find((specification) => specification.id === id);

    return specification ?? undefined;
  }

  async findMany(...ids: string[]): Promise<Specification[]> {
    const specification = this.specifications.filter((specification) => {
      return ids.includes(specification.id);
    });

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find((specification) => specification.name === name);

    return specification ?? undefined;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    const now = new Date();

    Object.assign(specification, {
      name,
      description,
      createdAt: now,
      updatedAt: now,
    });

    this.specifications.push(specification);

    return specification;
  }
}
