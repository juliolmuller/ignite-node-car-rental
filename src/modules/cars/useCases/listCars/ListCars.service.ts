import { inject, injectable } from 'tsyringe';

import { Car } from '@/cars/models';
import { ICarsRepository } from '@/cars/repositories';
import { IService } from '~/@types';

export interface IPayload {
  available?: boolean;
  category_id?: string;
  name?: string;
}

@injectable()
export class ListCarsService implements IService<Car[], IPayload> {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository
  ) {}

  async execute(payload: IPayload): Promise<Car[]> {
    const cars = await this.repository.list(payload);

    return cars;
  }
}
