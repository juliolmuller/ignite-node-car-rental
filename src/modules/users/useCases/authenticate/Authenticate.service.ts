import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { User } from '@/users/models';
import { IUsersRepository } from '@/users/repositories';
import { IService } from '~/@types';
import { BadRequestError } from '~/errors';

export interface IPayload {
  email: string;
  password: string;
}

export interface ITokenPayload {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface IReturn {
  token: string;
  user: {
    id: User['id'];
    name: User['name'];
    email: User['email'];
    avatar?: User['avatar'];
    is_admin: User['is_admin'];
    driver_license: User['driver_license'];
    created_at: User['created_at'];
    updated_at: User['updated_at'];
    password?: never;
  };
}

@injectable()
export class AuthenticateService implements IService<IReturn, IPayload> {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute({ email, password }: IPayload): Promise<IReturn> {
    const user = await this.repository.findByEmail(email);
    const isPasswordValid = Boolean(user?.password) && compareSync(password, user.password);

    if (!user || !isPasswordValid) {
      throw new BadRequestError('Incorrect email or password');
    }

    const tokenPayload: ITokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    };
    const token = sign({ payload: tokenPayload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
      subject: user.id,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        is_admin: user.is_admin,
        driver_license: user.driver_license,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  }
}
