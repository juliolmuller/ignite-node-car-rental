import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { ListCategoriesService } from './ListCategories.service';

export class ListCategoriesController implements IController {
  async handle(_: Request, response: Response) {
    const service = container.resolve(ListCategoriesService);
    const categories = await service.execute();

    response.status(200).json(categories);
  }
}
