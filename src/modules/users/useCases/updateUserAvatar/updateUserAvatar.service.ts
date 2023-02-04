import { inject, injectable } from 'tsyringe';

import { User } from '@/users/models';
import { IUsersRepository } from '@/users/repositories';
import { IService } from '~/@types';
import { NotFoundError } from '~/errors';
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
  isAdmin: User['isAdmin'];
  driverLicense: User['driverLicense'];
  createdAt: User['createdAt'];
  updatedAt: User['updatedAt'];
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
      throw new NotFoundError(`User with ID "${userId}" not found`);
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
      isAdmin: updatedUser.isAdmin,
      driverLicense: updatedUser.driverLicense,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
