import { ContainerModule } from 'inversify';
import { CORE_TYPES } from '../core/types';
import ApiSampleClient from './client/api-sample-client';
import MongoTalkRepository from './repository/mongo-sample-repository';
import RedisTalkRepository from './repository/redis-sample-repository';

export const infraModule = new ContainerModule((bind) => {
    bind(CORE_TYPES.SampleClient).to(ApiSampleClient);
    bind(CORE_TYPES.SampleMongoRepository).to(MongoTalkRepository);
    bind(CORE_TYPES.SampleRedisRepository).to(RedisTalkRepository);
});