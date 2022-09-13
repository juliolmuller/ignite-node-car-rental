import { User } from '../models';
import { ICreateUserDTO, IUsersRepository } from './interfaces';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[];

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
}
