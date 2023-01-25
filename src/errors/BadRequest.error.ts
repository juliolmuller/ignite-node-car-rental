import { StatusCodes } from 'http-status-codes';

import { AppError } from './App.error';

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
