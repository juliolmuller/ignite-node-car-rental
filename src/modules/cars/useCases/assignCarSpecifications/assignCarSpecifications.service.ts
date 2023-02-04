import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { Specification } from '@/cars/models';
import { ICarsRepository, ISpecificationsRepository } from '@/cars/repositories';
import { IService } from '~/@types';
import { NotFoundError, UnprocessableEntityError } from '~/errors';

export interface IPayload {
  car_id: string;
  specifications_ids: string[];
}

@injectable()
export class AssignCarSpecificationsService implements IService<Specification[], IPayload> {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_ids }: IPayload): Promise<Specification[]> {
    const areValidUUIDs = [car_id, ...specifications_ids].every(validate);

    if (!areValidUUIDs) {
      throw new UnprocessableEntityError("One or more UUID's are invalid");
    }

    const car = await this.carsRepository.find(car_id);

    if (!car) {
      throw new NotFoundError('Car not found');
    }

    const specifications = await this.specificationsRepository.findMany(...specifications_ids);

    if (specifications.length === 0) {
      throw new NotFoundError('No specifications found');
    }

    return this.carsRepository.assignSpecifications(car_id, ...specifications);
  }
}
