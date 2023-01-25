import 'reflect-metadata';

import { InMemoryCategoriesRepository } from '@/cars/repositories';
import { AppError } from '~/errors';

import { CreateCategoryService } from './CreateCategory.service';

describe('CreateCategoryService', () => {
  let categoriesRepository: InMemoryCategoriesRepository;
  let createCategoryService: CreateCategoryService;

  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategoryService = new CreateCategoryService(categoriesRepository);
  });

  it('should create a new category', async () => {
    const input = { name: 'New Category', description: 'An awesome description' };
    const output = await createCategoryService.execute(input);

    expect(output).toHaveProperty('id');
    expect(output).toEqual(expect.objectContaining(input));
  });

  it('should NOT create a category with duplicate name', async () => {
    const input1 = { name: 'Category X', description: 'An awesome description' };
    await createCategoryService.execute(input1);

    const input2 = { name: 'Category X', description: 'Another description' };
    const servicePromise = createCategoryService.execute(input2);

    expect(servicePromise).rejects.toBeInstanceOf(AppError);
  });
});
