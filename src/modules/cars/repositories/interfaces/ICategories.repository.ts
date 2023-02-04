import { Category } from '@/cars/models';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  list(): Promise<Category[]>;
  find(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
}
