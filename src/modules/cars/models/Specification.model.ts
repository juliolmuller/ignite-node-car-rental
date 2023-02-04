import { v4 as uuid } from 'uuid';

export class Specification {
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
