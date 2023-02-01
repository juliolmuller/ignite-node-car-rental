import { Car } from '@/cars/models';

import { ICarsRepository, ICreateCarDTO, IListCarsDTO } from './interfaces';

export class InMemoryCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license_plate === licensePlate);

    return car || null;
  }

  async create({
    available = true,
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
      available,
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

  async list({ available, brand, category_id, name }: IListCarsDTO = {}): Promise<Car[]> {
    return this.cars
      .filter((car) => typeof available === 'undefined' || car.available === available)
      .filter((car) => typeof category_id === 'undefined' || car.category_id === category_id)
      .filter((car) => typeof brand === 'undefined' || new RegExp(brand, 'i').test(car.brand))
      .filter((car) => typeof name === 'undefined' || new RegExp(name, 'i').test(car.name));
  }
}
