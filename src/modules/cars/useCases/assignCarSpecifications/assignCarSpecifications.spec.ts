import 'reflect-metadata';

import { InMemoryCarsRepository, InMemorySpecificationsRepository } from '@/cars/repositories';
import { NotFoundError, UnprocessableEntityError } from '~/errors';

import { AssignCarSpecificationsService } from './assignCarSpecifications.service';

describe('AssignCarSpecificationsService', () => {
  let specificationsRepository: InMemorySpecificationsRepository;
  let carsRepository: InMemoryCarsRepository;
  let assignCarSpecificationsService: AssignCarSpecificationsService;

  beforeEach(async () => {
    carsRepository = new InMemoryCarsRepository();
    specificationsRepository = new InMemorySpecificationsRepository();
    assignCarSpecificationsService = new AssignCarSpecificationsService(
      carsRepository,
      specificationsRepository
    );

    await carsRepository.create({
      name: 'New Car',
      description: 'An awesome description',
      brand: 'Carros',
      licensePlate: 'ABC1234',
      dailyRate: 600,
      fineAmount: 50,
    });
    await specificationsRepository.create({
      name: 'Specification 1',
      description: 'Any description.',
    });
    await specificationsRepository.create({
      name: 'Specification 2',
      description: 'Any description.',
    });
    await specificationsRepository.create({
      name: 'Specification 3',
      description: 'Any description.',
    });
  });

  it('should assign 3 specifications to given car', async () => {
    const [car] = await carsRepository.list();
    const specifications = await specificationsRepository.list();
    const input = {
      carId: car.id,
      specificationsIds: specifications.map(({ id }) => id),
    };
    const output = await assignCarSpecificationsService.execute(input);

    expect(output).toHaveLength(3);
    expect(output[0]).toEqual(
      expect.objectContaining(
        specifications.map(({ id, name, description }) => ({ id, name, description })).at(0)
      )
    );
  });

  it('throws an error if car ID is not UUID', async () => {
    const specifications = await specificationsRepository.list();
    const input = {
      carId: 'not.an.uuid',
      specificationsIds: specifications.map(({ id }) => id),
    };
    const promise = assignCarSpecificationsService.execute(input);

    expect(promise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('throws an error if specification ID is not UUID', async () => {
    const [car] = await carsRepository.list();
    const specifications = await specificationsRepository.list();
    const input = {
      carId: car.id,
      specificationsIds: specifications.map(({ id }) => id).concat(['not.an.uuid']),
    };
    const promise = assignCarSpecificationsService.execute(input);

    expect(promise).rejects.toBeInstanceOf(UnprocessableEntityError);
  });

  it('throws an error if car is not found', async () => {
    const specifications = await specificationsRepository.list();
    const input = {
      carId: '09650622-bb81-4a03-9ec6-622fa4f234aa',
      specificationsIds: specifications.map(({ id }) => id),
    };
    const promise = assignCarSpecificationsService.execute(input);

    expect(promise).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws an error if no specifications are found', async () => {
    const [car] = await carsRepository.list();
    const input = {
      carId: car.id,
      specificationsIds: ['09650622-bb81-4a03-9ec6-622fa4f234aa'],
    };
    const promise = assignCarSpecificationsService.execute(input);

    expect(promise).rejects.toBeInstanceOf(NotFoundError);
  });
});
