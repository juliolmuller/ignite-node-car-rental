import { v4 as uuid } from 'uuid';

import { Specification } from './Specification.model';

export class Car {
  readonly id: string;
  name: string;
  description: string;
  brand: string;
  license_plate: string;
  available: boolean;
  daily_rate: number;
  fine_amount: number;
  category_id?: string;
  specifications?: Specification[];
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.specifications = [];
    }
  }
}
