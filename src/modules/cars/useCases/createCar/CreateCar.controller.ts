import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { CreateCarService } from './CreateCar.service';

export class CreateCarController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(CreateCarService);
    const car = await service.execute(request.body);

    response.status(StatusCodes.CREATED).json(car);
  }
}
