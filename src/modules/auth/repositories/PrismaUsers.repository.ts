import { prisma } from '../../../database';
import { User } from '../models';
import { IUsersRepository, ICreateUserDTO } from './interfaces';

export class PrismaUsersRepository implements IUsersRepository {
  async create({ driver_license, email, name, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        driver_license,
        email,
        name,
        password,
      },
    });

    return user;
  }
}
