import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { CreateUserService } from './CreateUser.service';

export class CreateUserController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(CreateUserService);
    const user = await service.execute(request.body);

    response.status(StatusCodes.CREATED).json(user);
  }
}
