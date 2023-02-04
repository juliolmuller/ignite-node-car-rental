import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@/users/models';
import { IUsersRepository } from '@/users/repositories';
import { IService } from '~/@types';
import { UnprocessableEntityError } from '~/errors';

export interface IPayload {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
}

export interface IResult {
  id: User['id'];
  name: User['name'];
  email: User['email'];
  avatar?: User['avatar'];
  isAdmin: User['isAdmin'];
  driverLicense: User['driverLicense'];
  createdAt: User['createdAt'];
  updatedAt: User['updatedAt'];
  password?: never;
}

@injectable()
export class CreateUserService implements IService<IResult, IPayload> {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute({ driverLicense, email, name, password }: IPayload): Promise<IResult> {
    const emailAlreadyExists = await this.repository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new UnprocessableEntityError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...createdUser } = await this.repository.create({
      driverLicense,
      email,
      name,
      password: hashedPassword,
    });

    return createdUser;
  }
}
