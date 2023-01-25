import { StatusCodes } from 'http-status-codes';

export abstract class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
