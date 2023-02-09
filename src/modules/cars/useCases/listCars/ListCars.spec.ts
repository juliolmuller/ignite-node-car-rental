import { Category } from '@/cars/models';
import { InMemoryCategoriesRepository, InMemoryCarsRepository } from '@/cars/repositories';

import { ListCarsService } from './ListCars.service';

describe('ListCarsService', () => {
  let categoriesRepository: InMemoryCategoriesRepository;
  let carsRepository: InMemoryCarsRepository;
  let listCarService: ListCarsService;
  let category: Category;

  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoriesRepository();
    carsRepository = new InMemoryCarsRepository();
    listCarService = new ListCarsService(carsRepository);

    category = await categoriesRepository.create({
      name: 'Test Category',
      description: 'Any description for Test Category.',
    });
    const mockedCars = [
      {
        name: 'Car 1',
        description: 'Random description.',
        brand: 'Ford',
        licensePlate: 'AAA-0001',
        categoryId: category.id,
        available: true,
        dailyRate: 500,
        fineAmount: 50,
      },
      {
        name: 'Car 2',
        description: 'Random description.',
        brand: 'Ford',
        licensePlate: 'AAA-0002',
        categoryId: category.id,
        available: false,
        dailyRate: 500,
        fineAmount: 50,
      },
      {
        name: 'Car 3',
        description: 'Random description.',
        brand: 'Ford',
        licensePlate: 'AAA-0003',
        available: true,
        dailyRate: 500,
        fineAmount: 50,
      },
      {
        name: 'Vehicle A',
        description: 'Random description.',
        brand: 'Ford',
        licensePlate: 'AAA-0004',
        categoryId: category.id,
        available: false,
        dailyRate: 500,
        fineAmount: 50,
      },
      {
        name: 'Vehicle B',
        description: 'Random description.',
        brand: 'Ford',
        licensePlate: 'AAA-0005',
        available: true,
        dailyRate: 500,
        fineAmount: 50,
      },
    ];

    await Promise.all(mockedCars.map((car) => carsRepository.create(car)));
  });

  it('should list ALL cars', async () => {
    const output = await listCarService.execute({});

    expect(output).toHaveLength(5);
  });

  it('should list ONLY available cars', async () => {
    const output = await listCarService.execute({ available: true });

    expect(output).toHaveLength(3);
  });

  it('should list ONLY unavailable cars', async () => {
    const output = await listCarService.execute({ available: false });

    expect(output).toHaveLength(2);
  });

  it('should list ONLY cars with given category', async () => {
    const output = await listCarService.execute({ categoryId: category.id });

    expect(output).toHaveLength(3);
  });

  it('should list ONLY cars with name "H"', async () => {
    const output = await listCarService.execute({ name: 'H' });

    expect(output).toHaveLength(2);
  });

  it('should list ONLY available cars with name "H"', async () => {
    const output = await listCarService.execute({ available: true, name: 'H' });

    expect(output).toHaveLength(1);
  });
});
