import { BaseSampleValidator } from './application/validators/base-sample-validator';
import { BaseSampleService } from './domain/service/base-sample-service';

export const coreModules = [BaseSampleService, BaseSampleValidator];
