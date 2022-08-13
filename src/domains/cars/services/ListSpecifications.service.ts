import { Specification } from '../models';
import { ISpecificationsRepository } from '../repositories';

export class ListSpecificationsService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  public execute(): Specification[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}
