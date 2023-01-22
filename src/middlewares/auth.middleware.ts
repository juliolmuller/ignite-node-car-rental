import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors';
import { User } from '../modules/auth/models';

export interface IJWTPayload {
  sub: User['id'];
}

export function authMiddleware(): RequestHandler {
  return (request, _response, next) => {
    const authHeader = request.headers.authorization;
    const authToken = /^Bearer (?<token>[^ $]*)$/.exec(authHeader)?.groups?.token;

    if (!authToken) {
      throw new AppError('No token provided', 401);
    }

    try {
      verify(authToken, process.env.JWT_SECRET) as IJWTPayload;
      next();
    } catch {
      throw new AppError('Invalid authorization token', 401);
    }
  };
}
