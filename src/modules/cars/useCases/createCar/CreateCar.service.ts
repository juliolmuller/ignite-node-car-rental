import { inject, injectable } from 'tsyringe';

import { Car } from '@/cars/models';
import { ICarsRepository, ICategoriesRepository } from '@/cars/repositories';
import { IService } from '~/@types';
import { UnprocessableEntityError } from '~/errors';

export interface IPayload {
  name: string;
  description: string;
  brand: string;
  licensePlate: string;
  dailyRate: number;
  fineAmount: number;
  categoryId?: string;
}

@injectable()
export class CreateCarService implements IService<Car, IPayload> {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,

    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository
  ) {}

  async execute({
    name,
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
  }: IPayload): Promise<Car> {
    const category = await this.categoryRepository.find(categoryId);

    if (categoryId && !category) {
      throw new UnprocessableEntityError(`Category with ID "${categoryId}" does not exists`);
    }

    const carAlreadyExists = await this.repository.findByLicensePlate(licensePlate);

    if (carAlreadyExists) {
      throw new UnprocessableEntityError(`License plate "${licensePlate}" already exists`);
    }

    const createdCar = await this.repository.create({
      name,
      brand,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      categoryId: categoryId || undefined,
    });

    return createdCar;
  }
}
