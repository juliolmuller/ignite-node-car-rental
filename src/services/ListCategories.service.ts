import Category from '../models/Category';
import { ICategoriesRepository } from '../repositories/interfaces';

export default class ListCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}
