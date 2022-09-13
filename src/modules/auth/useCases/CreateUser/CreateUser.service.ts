import { inject, injectable } from 'tsyringe';

import { IService } from '../../../../types';
import { User } from '../../models';
import { IUsersRepository } from '../../repositories';

export interface IPayload {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
export class CreateUserService implements IService<User, IPayload> {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute({ driver_license, email, name, password }: IPayload): Promise<User> {
    const createdUser = await this.repository.create({
      driver_license,
      email,
      name,
      password,
    });

    return createdUser;
  }
}
