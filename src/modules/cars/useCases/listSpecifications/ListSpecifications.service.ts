import { inject, injectable } from 'tsyringe';

import { Specification } from '@/cars/models';
import { ISpecificationsRepository } from '@/cars/repositories';
import { IService } from '~/types';

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
