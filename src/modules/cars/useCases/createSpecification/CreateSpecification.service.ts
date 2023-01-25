import { inject, injectable } from 'tsyringe';

import { Specification } from '@/cars/models';
import { ISpecificationsRepository } from '@/cars/repositories';
import { AppError } from '~/errors';
import { IService } from '~/types';

export interface IPayload {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationService implements IService<Specification, IPayload> {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IPayload): Promise<Specification> {
    const specificationAlreadyExists = await this.repository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    }

    const createdSpecification = await this.repository.create({ name, description });

    return createdSpecification;
  }
}
