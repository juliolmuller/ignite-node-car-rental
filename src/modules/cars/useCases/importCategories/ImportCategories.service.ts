import { parse } from 'csv-parse';
import fs from 'node:fs';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@/cars/repositories';
import { IService } from '~/@types';

export type IPayload = Express.Multer.File;

export type IResult = {
  successCount: number;
  failureCount: number;
  errors?: Array<{
    message: string;
    data: {
      description?: string;
      name?: string;
    };
  }>;
};

@injectable()
export class ImportCategoriesService implements IService<IResult, IPayload> {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository
  ) {}

  async execute(file: IPayload): Promise<IResult> {
    const parser = parse();
    const unsavedRecords: IResult['errors'] = [];
    let successCount = 0;

    fs.createReadStream(file.path).pipe(parser);

    for await (const [name, description] of parser) {
      if (!name) {
        unsavedRecords.push({
          message: 'Field "name" cannot be empty.',
          data: { name, description },
        });
        continue;
      }

      if (!description) {
        unsavedRecords.push({
          message: 'Field "description" cannot be empty.',
          data: { name, description },
        });
        continue;
      }

      if (await this.repository.findByName(name)) {
        unsavedRecords.push({
          message: `Category with name "${name}" already exists.`,
          data: { name, description },
        });
        continue;
      }

      await this.repository.create({ name, description });
      successCount++;
    }

    return {
      successCount,
      failureCount: unsavedRecords.length,
      errors: unsavedRecords.length ? unsavedRecords : undefined,
    };
  }
}
