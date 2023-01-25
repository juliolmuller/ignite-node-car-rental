import { StatusCodes } from 'http-status-codes';

import { AppError } from './App.error';

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
