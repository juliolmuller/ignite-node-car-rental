import { Category } from '../models';
import { ICategoriesRepository } from '../repositories';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
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
