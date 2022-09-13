import { v4 as uuid } from 'uuid';

export class Specification {
  readonly id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
