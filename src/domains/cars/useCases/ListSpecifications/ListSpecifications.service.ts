import { IService } from '../../../../types';
import { Specification } from '../../models';
import { ISpecificationsRepository } from '../../repositories';

export class ListSpecificationsService implements IService<Specification[]> {
  constructor(private repository: ISpecificationsRepository) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.repository.list();

    return specifications;
  }
}
