import { Specification } from '@/cars/models';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  list(): Promise<Specification[]>;
  find(id: string): Promise<Specification | undefined>;
  findMany(...ids: string[]): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
}
