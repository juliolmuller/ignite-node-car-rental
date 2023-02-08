import { v4 as uuid } from 'uuid';

export class Rental {
  readonly id: string;
  userId: string;
  carId: string;
  pickUpDate: Date;
  dropOffDate: Date;
  actualDropOffDate?: Date;
  total: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
