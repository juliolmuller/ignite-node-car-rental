import { parse as csvParse } from 'csv-parse';
import fs from 'node:fs';

import { IService } from '../../../../types';
import { Category } from '../../models';
import { ICategoriesRepository } from '../../repositories';

export type IPayload = Express.Multer.File;

export class ImportCategoriesService implements IService<Promise<Category[]>, IPayload> {
  constructor(private repository: ICategoriesRepository) {}

  public execute(file: IPayload): Promise<Category[]> {
    const parser = csvParse();
    const stream = fs.createReadStream(file.path);
    const createdCategories: Category[] = [];

    stream.pipe(parser);

    return new Promise((resolve, reject) => {
      // runs routine when the file is fully read
      parser.on('end', () => {
        fs.promises.unlink(file.path);
        resolve(createdCategories);
      });

      // runs routine for each line of the csv file
      parser.on('data', ([name, description]) => {
        const categoryAlreadyExists = this.repository.findByName(name);

        if (categoryAlreadyExists) {
          reject(new Error(`Category "${name}" already exists!`));
        }

        const createdCategory = this.repository.create({ name, description });

        createdCategories.push(createdCategory);
      });
    });
  }
}
