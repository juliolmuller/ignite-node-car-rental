import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { CarImage } from '@/cars/models';
import { ICarsRepository } from '@/cars/repositories';
import { IService } from '~/@types';
import { NotFoundError, UnprocessableEntityError } from '~/errors';

export interface IPayload {
  carId: string;
  fileNames: string[];
}

@injectable()
export class uploadCarImagesService implements IService<CarImage[], IPayload> {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ carId, fileNames }: IPayload): Promise<CarImage[]> {
    const isValidUUID = validate(carId);

    if (!isValidUUID) {
      throw new UnprocessableEntityError('Not a valid UUID');
    }

    const car = await this.carsRepository.find(carId);

    if (!car) {
      throw new NotFoundError('Car not found');
    }

    return this.carsRepository.assignImages(carId, ...fileNames);
  }
}
