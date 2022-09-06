import { Specification } from '../../models';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  list(): Promise<Specification[]>;
  find(id: string): Promise<Specification | null>;
  findByName(name: string): Promise<Specification | null>;
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
}
