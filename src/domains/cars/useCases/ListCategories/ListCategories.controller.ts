import { Request, Response } from 'express';

import { IController, IService } from '../../../../types';
import { Category } from '../../models';

export class ListCategoriesController implements IController {
  constructor(private service: IService<Category[]>) {}

  handle = (_: Request, response: Response) => {
    const categories = this.service.execute();

    response.status(200).json(categories);
  };
}
