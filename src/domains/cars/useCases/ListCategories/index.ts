import { InMemoryCategoriesRepository } from '../../repositories';
import { ListCategoriesController } from './ListCategories.controller';
import { ListCategoriesService } from './ListCategories.service';

const categoriesRepository = InMemoryCategoriesRepository.getInstance();
const listCategoriesService = new ListCategoriesService(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesService);

export { listCategoriesController };
