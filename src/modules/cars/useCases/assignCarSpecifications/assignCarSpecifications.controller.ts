import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { AssignCarSpecificationsService } from './assignCarSpecifications.service';

export class AssignCarSpecificationsController implements IController {
  async handle(request: Request, response: Response) {
    const car_id = request.params.carId as string;
    const specifications_ids = request.body;
    const service = container.resolve(AssignCarSpecificationsService);
    const car = await service.execute({ car_id, specifications_ids });

    response.status(StatusCodes.OK).json(car);
  }
}
