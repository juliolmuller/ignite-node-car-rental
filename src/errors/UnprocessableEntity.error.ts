import { StatusCodes } from 'http-status-codes';

import { AppError } from './App.error';

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
