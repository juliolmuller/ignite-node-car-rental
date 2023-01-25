import { inject, injectable } from 'tsyringe';

import { User } from '@/users/models';
import { IUsersRepository } from '@/users/repositories';
import { IService } from '~/@types';
import { AppError } from '~/errors';
import { uploadUtils } from '~/utils';

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
    const oldUser = await this.repository.findById(userId);

    if (!oldUser) {
      throw new AppError(`User with ID "${userId}" not found`, 404);
    }

    const oldAvatar = oldUser.avatar;
    const updatedUser = await this.repository.update(userId, {
      avatar: userAvatar,
    });

    // No need to await this operation
    uploadUtils.destroy(`${process.env.STORAGE_AVATAR_PATH}/${oldAvatar}`);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      is_admin: updatedUser.is_admin,
      driver_license: updatedUser.driver_license,
      created_at: updatedUser.created_at,
      updated_at: updatedUser.updated_at,
    };
  }
}
