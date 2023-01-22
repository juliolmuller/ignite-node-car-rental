import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors';
import { IService } from '../../../../types';
import { User } from '../../models';
import { IUsersRepository } from '../../repositories';

export interface IPayload {
  email: string;
  password: string;
}

export interface ITokenPayload {
  id: string;
  name: string;
  email: string;
}

export interface IReturn {
  token: string;
  user: {
    id: User['id'];
    name: User['name'];
    email: User['email'];
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
    const { password: passwordHash, ...user } = await this.repository.findByEmail(email);
    const isPasswordValid = Boolean(user) && compareSync(password, passwordHash);

    if (!user || !isPasswordValid) {
      throw new AppError('Incorrect email or password');
    }

    const tokenPayload: ITokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
      subject: user.id,
    });

    return {
      token,
      user,
    };
  }
}
