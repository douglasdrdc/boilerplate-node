import { ContainerModule } from 'inversify';
import { CORE_TYPES } from "./types";
import BaseSampleService from './domain/service/base-sample-service';
import BaseSampleValidator from './application/validators/base-sample-validator';

export const coreModule = new ContainerModule((bind) => {
    bind(CORE_TYPES.SampleService).to(BaseSampleService);
    bind(CORE_TYPES.SampleValidator).to(BaseSampleValidator);
});