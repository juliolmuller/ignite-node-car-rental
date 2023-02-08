import 'reflect-metadata';

import { Car } from '@/cars/models';
import { InMemoryCarsRepository } from '@/cars/repositories';
import { InMemoryRentalsRepository } from '@/rentals/repositories';
import { User } from '@/users/models';
import { InMemoryUsersRepository } from '@/users/repositories';
import { UnprocessableEntityError } from '~/errors';

import { CreateRentalService } from './CreateRental.service';

describe('CreateRentalService', () => {
  let carsRepository: InMemoryCarsRepository;
  let usersRepository: InMemoryUsersRepository;
  let rentalsRepository: InMemoryRentalsRepository;
  let createRentalService: CreateRentalService;
  let mockedCars: Car[];
  let mockedUsers: User[];

  beforeEach(async () => {
    carsRepository = new InMemoryCarsRepository();
    usersRepository = new InMemoryUsersRepository();
    rentalsRepository = new InMemoryRentalsRepository();
    createRentalService = new CreateRentalService(
      rentalsRepository,
      carsRepository,
      usersRepository
    );
    mockedCars = [];
    mockedUsers = [];

    mockedCars.push(
      await carsRepository.create({
        name: 'Foo',
        description: 'Car for the family',
        licensePlate: 'AAA-1234',
        brand: 'Brand',
        dailyRate: 150,
        fineAmount: 50,
      })
    );
    mockedCars.push(
      await carsRepository.create({
        name: 'Bar',
        description: 'Car for racing',
        licensePlate: 'ABC-9999',
        brand: 'Brand',
        dailyRate: 200,
        fineAmount: 100,
      })
    );
    mockedUsers.push(
      await usersRepository.create({
        name: 'John Doe',
        email: 'john.doe@email.com',
        driverLicense: '123456789',
        password: 'Qwerty@1234',
      })
    );
    mockedUsers.push(
      await usersRepository.create({
        name: 'Mary Doe',
        email: 'mary.doe@email.com',
        driverLicense: '101010101',
        password: 'Qwerty@1234',
      })
    );
  });

  it('should create a rental', async () => {
    const input = {
      carId: mockedCars[0].id,
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 2, 1, 8),
      dropOffDate: new Date(2023, 2, 3, 20),
    };
    const output = await createRentalService.execute(input);

    expect(output).toHaveProperty('id');
    expect(output).toEqual(expect.objectContaining(input));
  });

  it('calculates rental amount correctly', async () => {
    const input = {
      carId: mockedCars[0].id,
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 2, 1, 8),
      dropOffDate: new Date(2023, 2, 3, 20),
    };
    const output = await createRentalService.execute(input);

    expect(output).toHaveProperty('total');
    expect(output.total).toEqual(525);
  });

  it('should NOT create a rental with drop-off date before pick-up one', () => {
    const input = {
      carId: mockedCars[0].id,
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 2, 3, 20),
      dropOffDate: new Date(2023, 2, 1, 8),
    };
    const servicePromise = createRentalService.execute(input);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('should NOT create a rental with drop-off date before pick-up one', () => {
    const input = {
      carId: mockedCars[0].id,
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 2, 1, 8),
      dropOffDate: new Date(2023, 2, 1, 20),
    };
    const servicePromise = createRentalService.execute(input);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('should NOT create a rental with erroneous user ID', () => {
    const input = {
      carId: mockedCars[0].id,
      userId: 'not.a.valid.uuid',
      pickUpDate: new Date(2023, 2, 1, 8),
      dropOffDate: new Date(2023, 2, 3, 20),
    };
    const servicePromise = createRentalService.execute(input);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('should NOT create a rental with erroneous car ID', () => {
    const input = {
      carId: 'not.a.valid.uuid',
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 2, 1, 8),
      dropOffDate: new Date(2023, 2, 3, 20),
    };
    const servicePromise = createRentalService.execute(input);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('should NOT create a rental for the same user at the same period', async () => {
    const input1 = {
      carId: mockedCars[0].id,
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 1, 1, 8),
      dropOffDate: new Date(2023, 1, 28, 20),
    };
    await createRentalService.execute(input1);

    const input2 = {
      carId: mockedCars[1].id,
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 1, 10, 8),
      dropOffDate: new Date(2023, 1, 20, 20),
    };
    const servicePromise = createRentalService.execute(input2);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('should NOT create a rental for the same car at the same period', async () => {
    const input1 = {
      carId: mockedCars[0].id,
      userId: mockedUsers[0].id,
      pickUpDate: new Date(2023, 1, 1, 8),
      dropOffDate: new Date(2023, 1, 28, 20),
    };
    await createRentalService.execute(input1);

    const input2 = {
      carId: mockedCars[0].id,
      userId: mockedUsers[1].id,
      pickUpDate: new Date(2023, 1, 10, 8),
      dropOffDate: new Date(2023, 1, 20, 20),
    };
    const servicePromise = createRentalService.execute(input2);

    expect(servicePromise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });
});
