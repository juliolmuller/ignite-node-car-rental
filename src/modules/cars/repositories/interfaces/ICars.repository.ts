import { Car, CarImage, Specification } from '@/cars/models';

export interface ICreateCarDTO {
  name: string;
  description: string;
  brand: string;
  licensePlate: string;
  dailyRate: number;
  fineAmount: number;
  available?: boolean;
  categoryId?: string;
}

export interface IListCarsDTO {
  available?: boolean;
  name?: string;
  brand?: string;
  categoryId?: string;
}

export interface ICarsRepository {
  list(dto?: IListCarsDTO): Promise<Car[]>;
  find(id: string): Promise<Car | undefined>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  create(dto: ICreateCarDTO): Promise<Car>;
  assignImages(carId: string, ...fileNames: string[]): Promise<CarImage[]>;
  assignSpecifications(carId: string, ...specifications: Specification[]): Promise<Specification[]>;
}
