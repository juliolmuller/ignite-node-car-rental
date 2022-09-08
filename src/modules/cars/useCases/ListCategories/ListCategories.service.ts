import { inject, injectable } from 'tsyringe';

import { IService } from '../../../../types';
import { Category } from '../../models';
import { ICategoriesRepository } from '../../repositories';

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
