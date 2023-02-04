import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { uploadCarImagesService } from './uploadCarImages.service';

export class UploadCarImagesController implements IController {
  async handle(request: Request, response: Response) {
    const carId = request.params.carId as string;
    const images = request.files as Express.Multer.File[];
    console.log(images);
    const fileNames = images.map((file) => file.filename);
    const service = container.resolve(uploadCarImagesService);
    const car = await service.execute({ carId, fileNames });

    response.status(StatusCodes.OK).json(car);
  }
}
