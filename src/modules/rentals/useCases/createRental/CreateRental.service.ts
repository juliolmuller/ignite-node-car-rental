import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@/cars/repositories';
import { Rental } from '@/rentals/models';
import { IRentalsRepository } from '@/rentals/repositories';
import { IUsersRepository } from '@/users/repositories';
import { IService } from '~/@types';
import { UnprocessableEntityError } from '~/errors';

export interface IPayload {
  carId: string;
  userId: string;
  pickUpDate: Date;
  dropOffDate: Date;
}

export interface IResult {
  id: Rental['id'];
  carId: Rental['carId'];
  userId: Rental['userId'];
  pickUpDate: Rental['pickUpDate'];
  dropOffDate: Rental['dropOffDate'];
  actualDropOffDate?: Rental['actualDropOffDate'];
  total: Rental['total'];
  createdAt: Rental['createdAt'];
  updatedAt: Rental['updatedAt'];
}

@injectable()
export class CreateRentalService implements IService<IResult, IPayload> {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carRepository: ICarsRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({ carId, dropOffDate, pickUpDate, userId }: IPayload): Promise<IResult> {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const interval = dropOffDate.getTime() - pickUpDate.getTime();
    const daysUsing = interval / MS_PER_DAY;

    if (interval <= 0) {
      throw new UnprocessableEntityError('Drop-off date must be a moment after pick-yo date');
    }

    if (daysUsing < 1) {
      throw new UnprocessableEntityError('Rental period should not be shorter than 24 hours');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnprocessableEntityError('User does not exist');
    }

    const car = await this.carRepository.find(carId);

    if (!car) {
      throw new UnprocessableEntityError('Car does not exist');
    }

    const conflictingRentals = await this.rentalRepository.getBetweenInterval({
      carId,
      dropOffDate,
      pickUpDate,
      userId,
    });

    if (conflictingRentals.length > 0) {
      throw new UnprocessableEntityError(
        'User or car already have a rental scheduled/active in this period'
      );
    }

    const total = car.dailyRate * daysUsing + car.dailyRate;

    return this.rentalRepository.create({
      carId,
      userId,
      pickUpDate,
      dropOffDate,
      total,
    });
  }
}
