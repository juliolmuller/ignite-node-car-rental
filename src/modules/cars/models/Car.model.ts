import { v4 as uuid } from 'uuid';

import { CarImage } from './CarImage.model';
import { Specification } from './Specification.model';

export class Car {
  readonly id: string;
  name: string;
  description: string;
  brand: string;
  licensePlate: string;
  available: boolean;
  dailyRate: number;
  fineAmount: number;
  categoryId?: string;
  images?: CarImage[];
  specifications?: Specification[];
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.images = [];
      this.specifications = [];
    }
  }
}
