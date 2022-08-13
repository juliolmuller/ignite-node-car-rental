import { Specification } from '../../models';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  list(): Specification[];
  find(id: string): Specification | null;
  findByName(name: string): Specification | null;
  create({ name, description }: ICreateSpecificationDTO): Specification;
}
