import { inject, injectable } from 'tsyringe';

import { IService } from '../../../../types';
import { Specification } from '../../models';
import { ISpecificationsRepository } from '../../repositories';

@injectable()
export class ListSpecificationsService implements IService<Specification[]> {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.repository.list();

    return specifications;
  }
}
