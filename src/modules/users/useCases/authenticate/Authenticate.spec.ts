import 'reflect-metadata';

import { InMemoryUsersRepository } from '@/users/repositories';
import { AppError } from '~/errors';

import { CreateUserService } from '../createUser/CreateUser.service';
import { AuthenticateService } from './Authenticate.service';

describe('AuthenticateService', () => {
  const USER_EMAIL = 'user@email.com';
  const USER_PASSWORD = 'Qwerty@123';
  let usersRepository: InMemoryUsersRepository;
  let createUserService: CreateUserService;
  let authenticateService: AuthenticateService;

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    createUserService = new CreateUserService(usersRepository);
    authenticateService = new AuthenticateService(usersRepository);

    await createUserService.execute({
      name: 'Dummy User',
      email: USER_EMAIL,
      password: USER_PASSWORD,
      driver_license: '123456789',
    });
  });

  it('should succeed authenticating user', async () => {
    const input = { email: USER_EMAIL, password: USER_PASSWORD };
    const output = await authenticateService.execute(input);

    expect(output).toHaveProperty('token');
  });

  it('should fail authentication if email is incorrect', async () => {
    const input = { email: 'incorrect@email.com', password: USER_PASSWORD };
    const servicePromise = authenticateService.execute(input);

    expect(servicePromise).rejects.toBeInstanceOf(AppError);
  });

  it('should fail authentication if password is incorrect', async () => {
    const input = { email: USER_EMAIL, password: '123456789' };
    const servicePromise = authenticateService.execute(input);

    expect(servicePromise).rejects.toBeInstanceOf(AppError);
  });
});
