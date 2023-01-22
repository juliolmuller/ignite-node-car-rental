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

export interface IReturn {
  token: string;
  user: Pick<User, 'id' | 'name' | 'email'>;
}

@injectable()
export class AuthenticateService implements IService<IReturn, IPayload> {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute({ email, password }: IPayload): Promise<IReturn> {
    const user = await this.repository.findByEmail(email);
    const isPasswordValid = Boolean(user) && compareSync(password, user.password);

    if (!user || !isPasswordValid) {
      throw new AppError('Incorrect email or password');
    }

    const tokenPayload: IReturn['user'] = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '900s', // 15min
      subject: user.id,
    });

    return {
      token,
      user: tokenPayload,
    };
  }
}
