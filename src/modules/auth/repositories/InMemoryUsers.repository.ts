import { User } from '@/auth/models';

import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from './interfaces';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ driver_license, email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    const now = new Date();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
      created_at: now,
      updated_at: now,
    });

    this.users.push(user);

    return user;
  }

  async update(
    id: string,
    { avatar, driver_license, email, name, password }: IUpdateUserDTO
  ): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    const now = new Date();

    if (!user) {
      return null;
    }

    user.name = name === undefined ? user.name : name;
    user.email = email === undefined ? user.email : email;
    user.avatar = avatar === undefined ? user.avatar : avatar;
    user.password = password === undefined ? user.password : password;
    user.driver_license = driver_license === undefined ? user.driver_license : driver_license;
    user.updated_at = now;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }
}
