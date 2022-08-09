import Category from '../models/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
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

export default new CategoriesRepository();
