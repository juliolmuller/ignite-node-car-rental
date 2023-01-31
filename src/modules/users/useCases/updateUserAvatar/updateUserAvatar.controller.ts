import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import { IController } from '~/@types';

import { UpdateUserAvatarService } from './updateUserAvatar.service';

export class UpdateUserAvatarController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(UpdateUserAvatarService);
    const userId = request.user?.id;
    const userAvatar = request.file.filename;
    const user = await service.execute({ userId, userAvatar });

    response.status(StatusCodes.CREATED).json(user);
  }
}
