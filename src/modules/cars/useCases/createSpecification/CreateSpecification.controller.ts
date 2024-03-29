import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { CreateSpecificationService } from './CreateSpecification.service';

export class CreateSpecificationController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(CreateSpecificationService);
    const specification = await service.execute(request.body);

    response.status(StatusCodes.CREATED).json(specification);
  }
}
