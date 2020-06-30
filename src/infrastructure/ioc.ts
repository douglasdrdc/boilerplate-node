import { ContainerModule } from 'inversify';
import { CORE_TYPES } from '../core/types';
import ApiSampleClient from './client/api-sample-client';
import RedisSampleRepository from './repository/redis-sample-repository';

export const infraModule = new ContainerModule((bind) => {
    bind(CORE_TYPES.SampleClient).to(ApiSampleClient);
    bind(CORE_TYPES.SampleRepository).to(RedisSampleRepository);
});