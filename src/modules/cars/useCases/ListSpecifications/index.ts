import { PrismaSpecificationsRepository } from '../../repositories';
import { ListSpecificationsController } from './ListSpecifications.controller';
import { ListSpecificationsService } from './ListSpecifications.service';

const specificationsRepository = PrismaSpecificationsRepository.getInstance();
const listSpecificationsService = new ListSpecificationsService(specificationsRepository);
const listSpecificationsController = new ListSpecificationsController(listSpecificationsService);

export { listSpecificationsController };
