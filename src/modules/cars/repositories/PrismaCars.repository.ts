import { Car, Specification } from '@/cars/models';
import { prisma } from '~/database';

import { ICarsRepository, ICreateCarDTO, IListCarsDTO } from './interfaces';

export class PrismaCarsRepository implements ICarsRepository {
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

  async find(id: string): Promise<Car | undefined> {
    const car = await prisma.car.findFirst({
      where: { id },
    });

    return car ?? undefined;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = await prisma.car.findFirst({
      where: { license_plate: licensePlate },
    });

    return car ?? undefined;
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

  async assignSpecifications(
    carId: string,
    ...specifications: Specification[]
  ): Promise<Specification[]> {
    const [, ...output] = await prisma.$transaction([
      // delete all existing specifications assigned to given car
      prisma.carsSpecifications.deleteMany({
        where: {
          car_id: carId,
        },
      }),
      ...specifications.map(({ id: specId }) => {
        return prisma.carsSpecifications.create({
          data: {
            specification_id: specId,
            car_id: carId,
          },
          include: {
            specification: true,
          },
        });
      }),
    ]);

    return output.map(
      (carSpecification): Specification => ({
        ...carSpecification.specification,
        updated_at: carSpecification.assigned_at,
      })
    );
  }
}
