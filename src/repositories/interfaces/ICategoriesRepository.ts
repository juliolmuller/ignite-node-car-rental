import Category from '../../models/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  list(): Category[];
  find(id: string): Category | null;
  findByName(name: string): Category | null;
  create({ name, description }: ICreateCategoryDTO): Category;
}
