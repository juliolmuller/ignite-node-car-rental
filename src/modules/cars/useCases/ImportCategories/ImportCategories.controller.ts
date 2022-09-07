import { Request, Response } from 'express';

import { IController, IService } from '../../../../types';
import { IPayload, IResult } from './ImportCategories.service';

export class ImportCategoriesController implements IController {
  constructor(private service: IService<IResult, IPayload>) {}

  handle = async (request: Request, response: Response) => {
    const result = await this.service.execute(request.file);
    const status = result.success_count ? 201 : 400;

    response.status(status).json(result);
  };
}
