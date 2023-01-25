import { ErrorRequestHandler } from 'express';
import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes';

import { AppError } from './App.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: error.statusCode,
      error: getReasonPhrase(error.statusCode),
      message: error.message,
    });
    return;
  }

  console.error(error.message);
  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};

export * from './App.error';
export * from './BadRequest.error';
export * from './Forbidden.error';
export * from './NotFound.error';
export * from './Unauthorized.error';
export * from './UnprocessableEntity.error';
