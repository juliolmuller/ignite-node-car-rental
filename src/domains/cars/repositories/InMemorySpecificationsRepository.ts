import { Specification } from '../models';
import { ISpecificationsRepository, ICreateSpecificationDTO } from './interfaces';

export class InMemorySpecificationsRepository implements ISpecificationsRepository {
  // eslint-disable-next-line no-use-before-define
  private static SINGLETON: InMemorySpecificationsRepository;

  private specifications: Specification[];

  private constructor() {
    this.specifications = [];
  }

  static getInstance(): InMemorySpecificationsRepository {
    if (!InMemorySpecificationsRepository.SINGLETON) {
      InMemorySpecificationsRepository.SINGLETON = new InMemorySpecificationsRepository();
    }

    return InMemorySpecificationsRepository.SINGLETON;
  }

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

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }
}
