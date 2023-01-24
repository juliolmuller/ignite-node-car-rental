import { prisma } from '../../../database';
import { User } from '../models';
import { IUsersRepository, ICreateUserDTO, IUpdateUserDTO } from './interfaces';

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

  async update(
    id: string,
    { avatar, driver_license, email, name, password }: IUpdateUserDTO
  ): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: { avatar, driver_license, email, name, password },
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
