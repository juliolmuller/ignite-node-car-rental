import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { ListCarsService } from './ListCars.service';

export class ListCarsController implements IController {
  async handle(request: Request, response: Response) {
    const rawAvailable = request.query.available;
    const rawCategoryId = request.query.categoryId;
    const rawBrand = request.query.brand;
    const rawName = request.query.name;
    const parsedParams = {
      available:
        typeof rawAvailable === 'undefined'
          ? undefined
          : Array.isArray(rawAvailable)
          ? rawAvailable[0].toString().toLowerCase() === 'true'
          : rawAvailable.toString().toLowerCase() === 'true',
      name:
        typeof rawName === 'undefined'
          ? undefined
          : Array.isArray(rawName)
          ? rawName[0].toString()
          : rawName.toString(),
      brand:
        typeof rawBrand === 'undefined'
          ? undefined
          : Array.isArray(rawBrand)
          ? rawBrand[0].toString()
          : rawBrand.toString(),
      categoryId:
        typeof rawCategoryId === 'undefined'
          ? undefined
          : Array.isArray(rawCategoryId)
          ? rawCategoryId[0].toString()
          : rawCategoryId.toString(),
    };
    const service = container.resolve(ListCarsService);
    const cars = await service.execute(parsedParams);

    response.status(200).json(cars);
  }
}
