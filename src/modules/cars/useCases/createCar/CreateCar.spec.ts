import { InMemoryCarsRepository, InMemoryCategoriesRepository } from '@/cars/repositories';
import { UnprocessableEntityError } from '~/errors';

import { CreateCarService } from './CreateCar.service';

describe('CreateCarService', () => {
  let categoriesRepository: InMemoryCategoriesRepository;
  let carsRepository: InMemoryCarsRepository;
  let createCarService: CreateCarService;

  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoriesRepository();
    carsRepository = new InMemoryCarsRepository();
    createCarService = new CreateCarService(carsRepository, categoriesRepository);

    await categoriesRepository.create({
      name: 'Test Category',
      description: 'Any description for Test Category.',
    });
  });

  it('should create a new car', async () => {
    const [category] = await categoriesRepository.list();
    const input = {
      name: 'New Car',
      description: 'An awesome description',
      brand: 'Ferrari',
      licensePlate: 'ABC1234',
      dailyRate: 600,
      fineAmount: 50,
      categoryId: category.id,
    };
    const output = await createCarService.execute(input);

    expect(output).toHaveProperty('id');
    expect(output).toEqual(expect.objectContaining(input));
  });

  it('should NOT create a car with duplicate license plate', async () => {
    const input1 = {
      name: 'Car X',
      description: 'An awesome description',
      brand: 'Ferrari',
      licensePlate: 'ABC1234',
      dailyRate: 600,
      fineAmount: 50,
    };
    await createCarService.execute(input1);

    const input2 = {
      name: 'Car Y',
      description: 'Another description',
      brand: 'Ford',
      licensePlate: 'ABC1234',
      dailyRate: 500,
      fineAmount: 40,
    };
    const servicePromise = createCarService.execute(input2);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('should create a car with empty category on invalid one', async () => {
    const input = {
      name: 'New Car',
      description: 'An awesome description',
      brand: 'Ferrari',
      licensePlate: 'ABC1234',
      dailyRate: 600,
      fineAmount: 50,
      categoryId: 'NON-SENSE UUID',
    };
    const servicePromise = createCarService.execute(input);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });
});
