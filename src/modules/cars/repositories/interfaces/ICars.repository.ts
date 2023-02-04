import { Car, Specification } from '@/cars/models';

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
  list(dto?: IListCarsDTO): Promise<Car[]>;
  find(id: string): Promise<Car | undefined>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  create(dto: ICreateCarDTO): Promise<Car>;
  assignSpecifications(carId: string, ...specifications: Specification[]): Promise<Specification[]>;
}
