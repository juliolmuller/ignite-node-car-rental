import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '~/types';

import { AuthenticateService } from './Authenticate.service';

export class AuthenticateController implements IController {
  async handle(request: Request, response: Response) {
    const service = container.resolve(AuthenticateService);
    const { token, user } = await service.execute(request.body);

    response.status(200).json({ token, user });
  }
}
