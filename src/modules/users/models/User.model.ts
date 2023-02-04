import { v4 as uuid } from 'uuid';

export class User {
  readonly id: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  driverLicense: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
