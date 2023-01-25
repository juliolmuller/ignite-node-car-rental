import { StatusCodes } from 'http-status-codes';

import { AppError } from './App.error';

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
