import 'reflect-metadata';

import { InMemoryCarsRepository } from '@/cars/repositories';

import { ListAvailableCarsService } from './ListAvailableCars.service';

describe('ListAvailableCarsService', () => {
  let carsRepository: InMemoryCarsRepository;
  let listAvailableCarService: ListAvailableCarsService;

  beforeEach(async () => {
    const mockedCars = [
      {
        name: 'Car 1',
        description: 'Random description.',
        brand: 'Ford',
        license_plate: 'AAA-0001',
        available: true,
        daily_rate: 500,
        fine_amount: 50,
      },
      {
        name: 'Car 2',
        description: 'Random description.',
        brand: 'Ford',
        license_plate: 'AAA-0002',
        available: false,
        daily_rate: 500,
        fine_amount: 50,
      },
      {
        name: 'Car 3',
        description: 'Random description.',
        brand: 'Ford',
        license_plate: 'AAA-0003',
        available: true,
        daily_rate: 500,
        fine_amount: 50,
      },
      {
        name: 'Car 4',
        description: 'Random description.',
        brand: 'Ford',
        license_plate: 'AAA-0004',
        available: false,
        daily_rate: 500,
        fine_amount: 50,
      },
      {
        name: 'Car 5',
        description: 'Random description.',
        brand: 'Ford',
        license_plate: 'AAA-0005',
        available: true,
        daily_rate: 500,
        fine_amount: 50,
      },
    ];

    carsRepository = new InMemoryCarsRepository();
    listAvailableCarService = new ListAvailableCarsService(carsRepository);

    await Promise.all(mockedCars.map((car) => carsRepository.create(car)));
  });

  it('should list ONLY available cars', async () => {
    const output = await listAvailableCarService.execute();

    expect(output).toHaveLength(3);
  });
});
