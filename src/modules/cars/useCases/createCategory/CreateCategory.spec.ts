/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';

import { InMemoryCategoriesRepository } from '@/cars/repositories';
import { AdminAuthorizationHeader, authorizeAdmin } from '~/__tests__/auth';
import { UnprocessableEntityError } from '~/errors';
import { app } from '~/server';

import { CreateCategoryService } from './CreateCategory.service';

describe('CreateCategoryController', () => {
  let adminAuthorization: AdminAuthorizationHeader;
  const http = supertest(app);

  beforeEach(async () => {
    adminAuthorization = await authorizeAdmin();
  });

  it('succeeds creating a category', async () => {
    const payload = {
      name: 'Test Category',
      description: 'This is a dummy description for the category.',
    };
    const response = await http
      .post('/api/v1/cars/categories')
      .set(adminAuthorization)
      .send(payload);

    expect(response.status).toBe(201);
  });
});

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

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });
});
