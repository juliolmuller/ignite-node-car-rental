import { Request, Response } from 'express';

import { IController, IService } from '../../../../types';
import { Specification } from '../../models';
import { IPayload } from './CreateSpecification.service';

export class CreateSpecificationController implements IController {
  constructor(private service: IService<Specification, IPayload>) {}

  handle = (request: Request, response: Response) => {
    const specification = this.service.execute(request.body);

    response.status(201).json(specification);
  };
}
