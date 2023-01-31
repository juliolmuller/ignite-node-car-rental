import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { ListAvailableCarsService } from './ListAvailableCars.service';

export class ListAvailableCarsController implements IController {
  async handle(_: Request, response: Response) {
    const service = container.resolve(ListAvailableCarsService);
    const cars = await service.execute();

    response.status(200).json(cars);
  }
}
