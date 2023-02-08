import { Rental } from '@/rentals/models';

import { ICreateRentalDTO, IGetBetweenInterval, IRentalsRepository } from './interfaces';

export class InMemoryRentalsRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  async getBetweenInterval({
    carId,
    dropOffDate,
    pickUpDate,
    userId,
  }: IGetBetweenInterval): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => {
      const overlapsPickUpDate =
        pickUpDate >= rental.pickUpDate && pickUpDate <= rental.dropOffDate;
      const overlapsDropOffDate =
        dropOffDate >= rental.pickUpDate && dropOffDate <= rental.dropOffDate;
      const matchesUser = userId === undefined || rental.userId === userId;
      const matchesCar = carId === undefined || rental.carId === carId;

      return (overlapsPickUpDate || overlapsDropOffDate) && (matchesUser || matchesCar);
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
    const rental = new Rental();
    const now = new Date();

    Object.assign(rental, {
      carId,
      userId,
      dropOffDate,
      pickUpDate,
      actualDropOffDate,
      total,
      createdAt: now,
      updatedAt: now,
    });

    this.rentals.push(rental);

    return rental;
  }

  // async update(
  //   id: string,
  //   { carId, userId, dropOffDate, pickUpDate, actualDropOffDate, total }: IUpdateRentalDTO
  // ): Promise<Rental> {
  //   const rental = this.rentals.find((user) => user.id === id);
  //   const now = new Date();

  //   if (!rental) {
  //     return null;
  //   }

  //   rental.carId = carId === undefined ? rental.carId : carId;
  //   rental.userId = userId === undefined ? rental.userId : userId;
  //   rental.pickUpDate = pickUpDate === undefined ? rental.pickUpDate : pickUpDate;
  //   rental.dropOffDate = dropOffDate === undefined ? rental.dropOffDate : dropOffDate;
  //   rental.actualDropOffDate =
  //     actualDropOffDate === undefined ? rental.actualDropOffDate : actualDropOffDate;
  //   rental.total = total === undefined ? rental.total : total;
  //   rental.updatedAt = now;

  //   return rental;
  // }
}
