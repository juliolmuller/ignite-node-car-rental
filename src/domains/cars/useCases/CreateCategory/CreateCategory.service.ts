import { IService } from '../../../../types';
import { Category } from '../../models';
import { ICategoriesRepository } from '../../repositories';

export interface IPayload {
  name: string;
  description: string;
}

export class CreateCategoryService implements IService<Category, IPayload> {
  constructor(private repository: ICategoriesRepository) {}

  public execute({ name, description }: IPayload): Category {
    const categoryAlreadyExists = this.repository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const createdCategory = this.repository.create({ name, description });

    return createdCategory;
  }
}
