import { Request, Response } from 'express';

import { IController, IService } from '../../../../types';
import { Category } from '../../models';
import { IPayload } from './ImportCategories.service';

export class ImportCategoriesController implements IController {
  constructor(private service: IService<Promise<Category[]>, IPayload>) {}

  handle = async (request: Request, response: Response) => {
    const categories = await this.service.execute(request.file);

    response.status(201).json(categories);
  };
}
