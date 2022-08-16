import { IService } from '../../../../types';
import { Specification } from '../../models';
import { ISpecificationsRepository } from '../../repositories';

export class ListSpecificationsService implements IService<Specification[]> {
  constructor(private repository: ISpecificationsRepository) {}

  public execute(): Specification[] {
    const specifications = this.repository.list();

    return specifications;
  }
}
