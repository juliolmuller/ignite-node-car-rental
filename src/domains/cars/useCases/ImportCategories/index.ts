import { InMemoryCategoriesRepository } from '../../repositories';
import { ImportCategoriesController } from './ImportCategories.controller';
import { ImportCategoriesService } from './ImportCategories.service';

const categoriesRepository = InMemoryCategoriesRepository.getInstance();
const importCategoriesService = new ImportCategoriesService(categoriesRepository);
const importCategoriesController = new ImportCategoriesController(importCategoriesService);

export { importCategoriesController };
