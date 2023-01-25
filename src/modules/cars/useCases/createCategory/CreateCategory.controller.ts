import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { CreateCategoryService } from './CreateCategory.service';

export class CreateCategoryController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(CreateCategoryService);
    const category = await service.execute(request.body);

    response.status(201).json(category);
  }
}
