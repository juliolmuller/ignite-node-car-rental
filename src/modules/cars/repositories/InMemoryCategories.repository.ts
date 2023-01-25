import { Category } from '@/cars/models';

import { ICategoriesRepository, ICreateCategoryDTO } from './interfaces';

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async find(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id);

    return category || null;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);

    return category || null;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();
    const now = new Date();

    Object.assign(category, {
      name,
      description,
      created_at: now,
      updated_at: now,
    });

    this.categories.push(category);

    return category;
  }
}
