import { Car } from '@/cars/models';

import { ICarsRepository, ICreateCarDTO } from './interfaces';

export class InMemoryCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license_plate === licensePlate);

    return car || null;
  }

  async create({
    brand,
    daily_rate,
    category_id,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    const now = new Date();

    Object.assign(car, {
      brand,
      daily_rate,
      category_id,
      description,
      fine_amount,
      license_plate,
      name,
      created_at: now,
      updated_at: now,
    });

    this.cars.push(car);

    return car;
  }
}
