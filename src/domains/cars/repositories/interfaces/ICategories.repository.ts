import { Category } from '../../models';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  list(): Promise<Category[]>;
  find(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
}
