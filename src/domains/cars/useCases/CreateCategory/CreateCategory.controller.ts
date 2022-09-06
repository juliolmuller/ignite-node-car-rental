import { Request, Response } from 'express';

import { IController, IService } from '../../../../types';
import { Category } from '../../models';
import { IPayload } from './CreateCategory.service';

export class CreateCategoryController implements IController {
  constructor(private service: IService<Category, IPayload>) {}

  handle = async (request: Request, response: Response) => {
    const category = await this.service.execute(request.body);

    response.status(201).json(category);
  };
}
