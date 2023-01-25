import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import { User } from '@/users/models';
import { UnauthorizedError } from '~/errors';

export interface IJWTPayload {
  sub: User['id'];
}

export function ensureAuthenticatedMiddleware(): RequestHandler {
  return (request, _response, next) => {
    const authHeader = request.headers.authorization;
    const authToken = /^Bearer (?<token>[^ $]*)$/.exec(authHeader)?.groups?.token;

    if (!authToken) {
      throw new UnauthorizedError('No token provided');
    }

    try {
      const { sub: userId } = verify(authToken, process.env.JWT_SECRET) as IJWTPayload;
      request.user = { id: userId };
      next();
    } catch {
      throw new UnauthorizedError('Invalid authorization token');
    }
  };
}
