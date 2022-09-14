import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '../../../../types';
import { ImportCategoriesService } from './ImportCategories.service';

export class ImportCategoriesController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(ImportCategoriesService);
    const result = await service.execute(request.file);
    const status = result.success_count ? 201 : 400;

    response.status(status).json(result);
  }
}
