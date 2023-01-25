import { inject, injectable } from 'tsyringe';

import { Category } from '@/cars/models';
import { ICategoriesRepository } from '@/cars/repositories';
import { IService } from '~/@types';
import { AppError } from '~/errors';

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
