import { ContainerModule } from 'inversify';
import { ENTRYPOINT_TYPES } from './type';
import { SampleController } from './http/controller/sample-controller';


export const entrypointModule = new ContainerModule((bind) => {
    bind(ENTRYPOINT_TYPES.SampleController).to(SampleController);
});