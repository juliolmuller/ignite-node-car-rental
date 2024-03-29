import { User } from '@/users/models';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  avatar?: string | null;
  password?: string;
  driverLicense?: string;
}

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  update(id: string, userData: IUpdateUserDTO): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
