import { RequestHandler } from 'express';

import { UnauthorizedError } from '~/errors';

export function ensureAdmin(): RequestHandler {
  return (request, _response, next) => {
    const isAdmin = Boolean(request.user?.isAdmin);

    if (!isAdmin) {
      throw new UnauthorizedError('Authorization denied');
    }

    next();
  };
}
