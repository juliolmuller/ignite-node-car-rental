import { inject, injectable } from 'tsyringe';

import { Car } from '@/cars/models';
import { ICarsRepository } from '@/cars/repositories';
import { IService } from '~/@types';

@injectable()
export class ListAvailableCarsService implements IService<Car[]> {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    const cars = await this.repository.listAvailable();

    return cars;
  }
}
