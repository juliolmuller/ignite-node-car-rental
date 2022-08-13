import { Category } from '../models';
import { ICategoriesRepository } from '../repositories';

export class ListCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}
