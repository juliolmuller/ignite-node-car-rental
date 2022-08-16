import { InMemoryCategoriesRepository } from '../../repositories';
import { CreateCategoryController } from './CreateCategory.controller';
import { CreateCategoryService } from './CreateCategory.service';

const categoriesRepository = InMemoryCategoriesRepository.getInstance();
const createCategoryService = new CreateCategoryService(categoriesRepository);
const createCategoryController = new CreateCategoryController(createCategoryService);

export { createCategoryController };
