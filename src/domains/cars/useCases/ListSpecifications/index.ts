import { InMemorySpecificationsRepository } from '../../repositories';
import { ListSpecificationsController } from './ListSpecifications.controller';
import { ListSpecificationsService } from './ListSpecifications.service';

const specificationsRepository = InMemorySpecificationsRepository.getInstance();
const listSpecificationsService = new ListSpecificationsService(specificationsRepository);
const listSpecificationsController = new ListSpecificationsController(listSpecificationsService);

export { listSpecificationsController };
