import { IService } from '../../../../types';
import { Category } from '../../models';
import { ICategoriesRepository } from '../../repositories';

export class ListCategoriesService implements IService<Category[]> {
  constructor(private repository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();

    return categories;
  }
}
