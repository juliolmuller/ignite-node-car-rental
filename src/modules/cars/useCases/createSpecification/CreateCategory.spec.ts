import 'reflect-metadata';

import { InMemorySpecificationsRepository } from '@/cars/repositories';
import { AppError } from '~/errors';

import { CreateSpecificationService } from './CreateSpecification.service';

describe('CreateSpecificationService', () => {
  let specificationsRepository: InMemorySpecificationsRepository;
  let createSpecificationService: CreateSpecificationService;

  beforeEach(() => {
    specificationsRepository = new InMemorySpecificationsRepository();
    createSpecificationService = new CreateSpecificationService(specificationsRepository);
  });

  it('should create a new specification', async () => {
    const input = { name: 'New Specification', description: 'An awesome description' };
    const output = await createSpecificationService.execute(input);

    expect(output).toHaveProperty('id');
    expect(output).toEqual(expect.objectContaining(input));
  });

  it('should NOT create a specification with duplicate name', async () => {
    const input1 = { name: 'Specification X', description: 'An awesome description' };
    await createSpecificationService.execute(input1);

    const input2 = { name: 'Specification X', description: 'Another description' };
    const servicePromise = createSpecificationService.execute(input2);

    expect(servicePromise).rejects.toBeInstanceOf(AppError);
  });
});
