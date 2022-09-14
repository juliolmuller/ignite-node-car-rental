import { hash } from 'bcrypt';
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
    const emailAlreadyExists = await this.repository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hash(password, 8);
    const createdUser = await this.repository.create({
      driver_license,
      email,
      name,
      password: hashedPassword,
    });

    return createdUser;
  }
}
