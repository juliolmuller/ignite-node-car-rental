import { IService } from '../../../../types';
import { Category } from '../../models';
import { ICategoriesRepository } from '../../repositories';

export class ListCategoriesService implements IService<Category[]> {
  constructor(private repository: ICategoriesRepository) {}

  public execute(): Category[] {
    const categories = this.repository.list();

    return categories;
  }
}
