import { ContainerModule } from 'inversify';
import { CORE_TYPES } from "./types";
import SampleService from './domain/service/sample-service';
import SampleValidator from './application/validators/sample-validator';

export const coreModule = new ContainerModule((bind) => {
    bind(CORE_TYPES.ISampleService).to(SampleService);
    bind(CORE_TYPES.ISampleValidator).to(SampleValidator);
});