import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { Car } from '@/cars/models';
import { ICarsRepository, ICategoriesRepository } from '@/cars/repositories';
import { IService } from '~/@types';
import { UnprocessableEntityError } from '~/errors';

export interface IPayload {
  name: string;
  description: string;
  brand: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  category_id?: string;
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
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: IPayload): Promise<Car> {
    const category = await this.categoryRepository.find(category_id);

    if (category_id && !category) {
      throw new UnprocessableEntityError(`Category with ID "${category_id}" does not exists`);
    }

    const carAlreadyExists = await this.repository.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new UnprocessableEntityError(`License plate "${license_plate}" already exists`);
    }

    const createdCar = await this.repository.create({
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      category_id: category_id || undefined,
    });

    return createdCar;
  }
}
