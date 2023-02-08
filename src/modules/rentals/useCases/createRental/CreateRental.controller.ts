import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { CreateRentalService } from './CreateRental.service';

export class CreateRentalController implements IController {
  async handle(request: Request, response: Response) {
    const dto = {
      userId: request.user.isAdmin ? request.body.userId ?? request.user.id : request.user.id,
      carId: request.body.carId,
      dropOffDate: new Date(request.body.dropOffDate),
      pickUpDate: new Date(request.body.pickUpDate),
    };
    const service = container.resolve(CreateRentalService);
    const rental = await service.execute(dto);

    response.status(StatusCodes.CREATED).json(rental);
  }
}
