import { v4 as uuid } from 'uuid';

export class Category {
  readonly id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
