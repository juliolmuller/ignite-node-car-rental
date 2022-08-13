import { Specification } from '../models';
import { ISpecificationsRepository } from '../repositories';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  public execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Category already exists!');
    }

    const createdSpecification = this.specificationsRepository.create({ name, description });

    return createdSpecification;
  }
}
