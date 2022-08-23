import { IService } from '../../../../types';
import { Specification } from '../../models';
import { ISpecificationsRepository } from '../../repositories';

export interface IPayload {
  name: string;
  description: string;
}

export class CreateSpecificationService implements IService<Specification, IPayload> {
  constructor(private repository: ISpecificationsRepository) {}

  public execute({ name, description }: IPayload): Specification {
    const specificationAlreadyExists = this.repository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    const createdSpecification = this.repository.create({ name, description });

    return createdSpecification;
  }
}
