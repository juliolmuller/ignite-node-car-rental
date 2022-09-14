import { inject, injectable } from 'tsyringe';

import { IService } from '../../../../types';
import { Specification } from '../../models';
import { ISpecificationsRepository } from '../../repositories';

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
      throw new Error('Specification already exists');
    }

    const createdSpecification = await this.repository.create({ name, description });

    return createdSpecification;
  }
}
