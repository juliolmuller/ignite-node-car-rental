import { User } from '../../models';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
