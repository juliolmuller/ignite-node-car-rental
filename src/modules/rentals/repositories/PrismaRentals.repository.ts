import { Rental } from '@/rentals/models';
import { prisma } from '~/database';

import { IRentalsRepository, ICreateRentalDTO, IGetBetweenInterval } from './interfaces';

export class PrismaRentalsRepository implements IRentalsRepository {
  async getBetweenInterval({
    carId,
    dropOffDate,
    pickUpDate,
    userId,
  }: IGetBetweenInterval): Promise<Rental[]> {
    const rentals = prisma.rental.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                AND: [{ pickUpDate: { gte: pickUpDate } }, { pickUpDate: { lte: dropOffDate } }],
              },
              {
                AND: [{ dropOffDate: { gte: pickUpDate } }, { dropOffDate: { lte: dropOffDate } }],
              },
            ],
          },
          {
            OR: [...(carId ? [{ carId }] : []), ...(userId ? [{ userId }] : [])],
          },
        ],
      },
    });

    return rentals;
  }

  async create({
    carId,
    userId,
    dropOffDate,
    pickUpDate,
    actualDropOffDate,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = await prisma.rental.create({
      data: { carId, dropOffDate, pickUpDate, actualDropOffDate, total, userId },
    });

    return rental;
  }

  // async update(
  //   id: string,
  //   { carId, userId, dropOffDate, pickUpDate, actualDropOffDate, total }: IUpdateRentalDTO
  // ): Promise<Rental> {
  //   const rental = await prisma.rental.update({
  //     where: { id },
  //     data: { carId, userId, dropOffDate, pickUpDate, actualDropOffDate, total },
  //   });

  //   return rental || null;
  // }
}
