import { Car } from '@/cars/models';
import { prisma } from '~/database';

import { ICarsRepository, ICreateCarDTO, IListCarsDTO } from './interfaces';

export class PrismaCarsRepository implements ICarsRepository {
  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = await prisma.car.findFirst({
      where: { license_plate: licensePlate },
    });

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
    const car = await prisma.car.create({
      data: {
        available,
        brand,
        daily_rate,
        category_id,
        description,
        fine_amount,
        license_plate,
        name,
      },
    });

    return car;
  }

  async list({ available, brand, category_id, name }: IListCarsDTO = {}): Promise<Car[]> {
    const cars = await prisma.car.findMany({
      where: {
        AND: [
          { available },
          { category_id },
          {
            brand: brand && {
              contains: brand,
              mode: 'insensitive',
            },
          },
          {
            name: name && {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return cars;
  }
}
