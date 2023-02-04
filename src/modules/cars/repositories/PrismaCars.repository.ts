import { Car, CarImage, Specification } from '@/cars/models';
import { prisma } from '~/database';

import { ICarsRepository, ICreateCarDTO, IListCarsDTO } from './interfaces';

export class PrismaCarsRepository implements ICarsRepository {
  async list({ available, brand, categoryId, name }: IListCarsDTO = {}): Promise<Car[]> {
    const cars = await prisma.car.findMany({
      where: {
        AND: [
          { available },
          { categoryId },
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
      where: { licensePlate },
    });

    return car ?? undefined;
  }

  async create({
    available = true,
    brand,
    dailyRate,
    categoryId,
    description,
    fineAmount,
    licensePlate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        available,
        brand,
        dailyRate,
        categoryId,
        description,
        fineAmount,
        licensePlate,
        name,
      },
    });

    return car;
  }

  async assignImages(carId: string, ...fileNames: string[]): Promise<CarImage[]> {
    const output = await prisma.$transaction(
      fileNames.map((fileName) => {
        return prisma.carImages.create({
          data: { carId, fileName },
        });
      })
    );

    return output;
  }

  async assignSpecifications(
    carId: string,
    ...specifications: Specification[]
  ): Promise<Specification[]> {
    const [, ...output] = await prisma.$transaction([
      // delete all existing specifications assigned to given car
      prisma.carsSpecifications.deleteMany({
        where: { carId },
      }),
      ...specifications.map(({ id: specId }) => {
        return prisma.carsSpecifications.create({
          data: {
            specificationId: specId,
            carId,
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
        updatedAt: carSpecification.assignedAt,
      })
    );
  }
}
