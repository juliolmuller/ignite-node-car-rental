import { Car } from '@/cars/models';

export interface ICreateCarDTO {
  name: string;
  description: string;
  brand: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  available?: boolean;
  category_id?: string;
}

export interface IListCarsDTO {
  available?: boolean;
  name?: string;
  brand?: string;
  category_id?: string;
}

export interface ICarsRepository {
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
  create(dto: ICreateCarDTO): Promise<Car>;
  list(dto?: IListCarsDTO): Promise<Car[]>;
}
