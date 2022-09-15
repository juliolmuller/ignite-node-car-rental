import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import { User } from '../modules/auth/models';

export interface IJWTPayload {
  sub: User['id'];
}

export function authMiddleware(): RequestHandler {
  return (request, _response, next) => {
    const authHeader = request.headers.authorization;
    const authToken = /^Bearer (?<token>[^ $]*)$/.exec(authHeader)?.groups?.token;

    if (!authToken) {
      throw new Error('No token provided');
    }

    try {
      verify(authToken, process.env.JWT_SECRET) as IJWTPayload;
      next();
    } catch {
      throw new Error('Invalid authorization token');
    }
  };
}
