import { Category } from '../models';
import { ICategoriesRepository, ICreateCategoryDTO } from './interfaces';

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  // eslint-disable-next-line no-use-before-define
  private static SINGLETON: InMemoryCategoriesRepository;

  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  static getInstance(): InMemoryCategoriesRepository {
    if (!InMemoryCategoriesRepository.SINGLETON) {
      InMemoryCategoriesRepository.SINGLETON = new InMemoryCategoriesRepository();
    }

    return InMemoryCategoriesRepository.SINGLETON;
  }

  list(): Category[] {
    return this.categories;
  }

  find(id: string): Category | null {
    const category = this.categories.find((category) => category.id === id);

    return category || null;
  }

  findByName(name: string): Category | null {
    const category = this.categories.find((category) => category.name === name);

    return category || null;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }
}
