import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@/auth/models';
import { IUsersRepository } from '@/auth/repositories';
import { AppError } from '~/errors';
import { IService } from '~/types';

export interface IPayload {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

export interface IResult {
  id: User['id'];
  name: User['name'];
  email: User['email'];
  avatar?: User['avatar'];
  is_admin: User['is_admin'];
  driver_license: User['driver_license'];
  created_at: User['created_at'];
  updated_at: User['updated_at'];
  password?: never;
}

@injectable()
export class CreateUserService implements IService<IResult, IPayload> {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute({ driver_license, email, name, password }: IPayload): Promise<IResult> {
    const emailAlreadyExists = await this.repository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...createdUser } = await this.repository.create({
      driver_license,
      email,
      name,
      password: hashedPassword,
    });

    return createdUser;
  }
}
