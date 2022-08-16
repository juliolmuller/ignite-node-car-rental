import { InMemorySpecificationsRepository } from '../../repositories';
import { CreateSpecificationController } from './CreateSpecification.controller';
import { CreateSpecificationService } from './CreateSpecification.service';

const specificationsRepository = InMemorySpecificationsRepository.getInstance();
const createSpecificationService = new CreateSpecificationService(specificationsRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationService);

export { createSpecificationController };
