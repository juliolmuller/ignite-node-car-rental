import { Rental } from '@/rentals/models';

export interface IGetBetweenInterval {
  pickUpDate: Rental['pickUpDate'];
  dropOffDate: Rental['dropOffDate'];
  userId?: Rental['userId'];
  carId?: Rental['carId'];
}

export interface ICreateRentalDTO {
  userId: Rental['userId'];
  carId: Rental['carId'];
  pickUpDate: Rental['pickUpDate'];
  dropOffDate: Rental['dropOffDate'];
  actualDropOffDate?: Rental['actualDropOffDate'];
  total: Rental['total'];
}

// export interface IUpdateRentalDTO {
//   userId: Rental['userId'];
//   carId: Rental['carId'];
//   pickUpDate: Rental['pickUpDate'];
//   dropOffDate: Rental['dropOffDate'];
//   actualDropOffDate?: Rental['actualDropOffDate'];
//   total: Rental['total'];
// }

export interface IRentalsRepository {
  getBetweenInterval(params: IGetBetweenInterval): Promise<Rental[]>;
  create(rentalData: ICreateRentalDTO): Promise<Rental>;
  // update(id: string, rentalData: IUpdateRentalDTO): Promise<Rental | null>;
}
