import { ContainerModule } from 'inversify';
import { CORE_TYPES } from "./types";
import SampleService from './domain/service/sample-service';

export const coreModule = new ContainerModule((bind) => {
    bind(CORE_TYPES.ISampleService).to(SampleService);
});