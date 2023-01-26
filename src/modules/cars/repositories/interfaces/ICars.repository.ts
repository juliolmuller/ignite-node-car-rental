import { Car } from '@/cars/models';

export interface ICreateCarDTO {
  name: string;
  description: string;
  brand: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  category_id?: string;
}

export interface ICarsRepository {
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
  create(payload: ICreateCarDTO): Promise<Car>;
}
