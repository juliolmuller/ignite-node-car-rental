import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { ImportCategoriesService } from './ImportCategories.service';

export class ImportCategoriesController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(ImportCategoriesService);
    const result = await service.execute(request.file);
    const status = result.successCount ? StatusCodes.CREATED : StatusCodes.UNPROCESSABLE_ENTITY;

    response.status(status).json(result);
  }
}
