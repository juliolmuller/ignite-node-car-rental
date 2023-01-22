import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors';
import { IService } from '../../../../types';
import { Category } from '../../models';
import { ICategoriesRepository } from '../../repositories';

export interface IPayload {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryService implements IService<Category, IPayload> {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IPayload): Promise<Category> {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    const createdCategory = await this.repository.create({ name, description });

    return createdCategory;
  }
}
