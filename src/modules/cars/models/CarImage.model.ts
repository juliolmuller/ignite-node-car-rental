import { v4 as uuid } from 'uuid';

export class CarImage {
  readonly id: string;
  carId: string;
  fileName: string;
  uploadedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
