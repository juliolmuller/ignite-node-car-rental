import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import { UnauthorizedError } from '~/errors';

export interface IJWTPayload {
  payload: {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
  };
}

export function ensureAuth(): RequestHandler {
  return (request, _response, next) => {
    const authHeader = request.headers.authorization;
    const authToken = /^Bearer (?<token>[^ $]*)$/.exec(authHeader)?.groups?.token;

    if (!authToken) {
      throw new UnauthorizedError('No token provided');
    }

    try {
      const { payload: user } = verify(authToken, process.env.JWT_SECRET) as IJWTPayload;
      request.user = user;
      next();
    } catch {
      throw new UnauthorizedError('Invalid authorization token');
    }
  };
}
