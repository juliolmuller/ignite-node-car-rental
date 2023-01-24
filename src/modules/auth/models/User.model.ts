import { v4 as uuid } from 'uuid';

export class User {
  readonly id: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  driver_license: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
