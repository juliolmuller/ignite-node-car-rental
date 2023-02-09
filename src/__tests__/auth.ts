/* eslint-disable import/no-extraneous-dependencies */
import { hash } from 'bcrypt';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';

import { prisma } from '~/database';
import { app } from '~/server';

type UserData = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

type AuthorizationHeader = {
  authorization: string;
};

export type StdAuthorizationHeader = AuthorizationHeader;

export type AdminAuthorizationHeader = AuthorizationHeader;

async function authorize(userData: UserData): Promise<AuthorizationHeader> {
  await prisma.$executeRawUnsafe(
    `INSERT INTO users (id, is_admin, name, email, password, driver_license, updated_at)
      VALUES ($1, $2, $3, $4, $5, '123456789', NOW());`,
    uuid(),
    userData.isAdmin,
    userData.name,
    userData.email,
    await hash(userData.password, 8)
  );

  const http = supertest(app);
  const response = await http.post('/api/v1/auth').send(userData);
  console.log(response.body);

  return { authorization: `Bearer ${response.body.token}` };
}

export function authorizeStandard(): Promise<StdAuthorizationHeader> {
  return authorize({
    name: 'Standard User',
    email: 'user@email.com',
    password: 'secret',
    isAdmin: false,
  });
}

export function authorizeAdmin(): Promise<AdminAuthorizationHeader> {
  return authorize({
    name: 'Admin User',
    email: 'admin@email.com',
    password: 'secret',
    isAdmin: true,
  });
}
