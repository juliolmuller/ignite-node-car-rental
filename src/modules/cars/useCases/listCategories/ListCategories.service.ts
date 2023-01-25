import { inject, injectable } from 'tsyringe';

import { Category } from '@/cars/models';
import { ICategoriesRepository } from '@/cars/repositories';
import { IService } from '~/types';

@injectable()
export class ListCategoriesService implements IService<Category[]> {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();

    return categories;
  }
}
