import { User } from '@/auth/models';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  avatar?: string | null;
  password?: string;
  driver_license?: string;
}

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  update(id: string, userData: IUpdateUserDTO): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
