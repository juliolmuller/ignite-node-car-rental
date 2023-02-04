import { User } from '@/users/models';
import { prisma } from '~/database';

import { IUsersRepository, ICreateUserDTO, IUpdateUserDTO } from './interfaces';

export class PrismaUsersRepository implements IUsersRepository {
  async create({ driverLicense, email, name, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        driverLicense,
        email,
        name,
        password,
      },
    });

    return user;
  }

  async update(
    id: string,
    { avatar, driverLicense, email, name, password }: IUpdateUserDTO
  ): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: { avatar, driverLicense, email, name, password },
    });

    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user || null;
  }
}
