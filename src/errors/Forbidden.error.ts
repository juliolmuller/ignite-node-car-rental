import { StatusCodes } from 'http-status-codes';

import { AppError } from './App.error';

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
