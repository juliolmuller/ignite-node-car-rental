import { ErrorRequestHandler } from 'express';

import { AppError } from './App.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(error.message);
  response.status(500).json({ message: 'Internal Server Error' });
};

export { AppError, errorHandler };
