import { Request, Response } from 'express';

import { IController, IService } from '../../../../types';
import { Specification } from '../../models';

export class ListSpecificationsController implements IController {
  constructor(private service: IService<Specification[]>) {}

  handle = async (_: Request, response: Response) => {
    const specifications = await this.service.execute();

    response.status(200).json(specifications);
  };
}
