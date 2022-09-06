import { v4 as uuid } from 'uuid';

export class Category {
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
