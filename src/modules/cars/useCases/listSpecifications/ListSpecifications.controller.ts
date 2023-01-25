import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { ListSpecificationsService } from './ListSpecifications.service';

export class ListSpecificationsController implements IController {
  async handle(_: Request, response: Response) {
    const service = container.resolve(ListSpecificationsService);
    const specifications = await service.execute();

    response.status(200).json(specifications);
  }
}
