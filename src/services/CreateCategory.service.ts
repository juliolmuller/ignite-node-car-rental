import Category from '../models/Category';
import { ICategoriesRepository } from '../repositories/interfaces';

export interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public execute({ name, description }: IRequest): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!');
    }

    const createdCategory = this.categoriesRepository.create({ name, description });

    return createdCategory;
  }
}
