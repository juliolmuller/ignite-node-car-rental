import { Specification } from '@/cars/models';

import { ISpecificationsRepository, ICreateSpecificationDTO } from './interfaces';

export class InMemorySpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async find(id: string): Promise<Specification | null> {
    const specification = this.specifications.find((specification) => specification.id === id);

    return specification || null;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specifications.find((specification) => specification.name === name);

    return specification || null;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    const now = new Date();

    Object.assign(specification, {
      name,
      description,
      created_at: now,
      updated_at: now,
    });

    this.specifications.push(specification);

    return specification;
  }
}
