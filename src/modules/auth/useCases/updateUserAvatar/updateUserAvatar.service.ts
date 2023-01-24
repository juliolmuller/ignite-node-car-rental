import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors';
import { IService } from '../../../../types';
import { User } from '../../models';
import { IUsersRepository } from '../../repositories';

export interface IPayload {
  userAvatar: User['avatar'];
  userId: User['id'];
}

export interface IResponse {
  id: User['id'];
  name: User['name'];
  email: User['email'];
  avatar?: User['avatar'];
  is_admin: User['is_admin'];
  driver_license: User['driver_license'];
  created_at: User['created_at'];
  updated_at: User['updated_at'];
  password?: never;
}

@injectable()
export class UpdateUserAvatarService implements IService<IResponse, IPayload> {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute({ userAvatar, userId }: IPayload): Promise<IResponse> {
    const user = await this.repository.update(userId, {
      avatar: userAvatar,
    });

    if (!user) {
      throw new AppError(`User with ID "${userId}" not found`, 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      is_admin: user.is_admin,
      driver_license: user.driver_license,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
