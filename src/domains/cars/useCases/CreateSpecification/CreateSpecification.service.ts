import { IService } from '../../../../types';
import { Specification } from '../../models';
import { ISpecificationsRepository } from '../../repositories';

export interface IPayload {
  name: string;
  description: string;
}

export class CreateSpecificationService implements IService<Specification, IPayload> {
  constructor(private repository: ISpecificationsRepository) {}

  async execute({ name, description }: IPayload): Promise<Specification> {
    const specificationAlreadyExists = await this.repository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    const createdSpecification = await this.repository.create({ name, description });

    return createdSpecification;
  }
}
