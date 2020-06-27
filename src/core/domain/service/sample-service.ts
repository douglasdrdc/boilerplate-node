import { injectable, inject } from 'inversify';
import ISampleService from "./interface/iSample-service";
import Sample from '../model/sample';
import { CORE_TYPES } from '../../types';
import SampleRedisRepository from '../infrastructure/repository/sample-redis-repository';

@injectable()
export default class SampleService implements ISampleService {
    constructor(
        @inject(CORE_TYPES.SampleRedisRepository) private readonly repositoryRedis: SampleRedisRepository
    ) {}

    async getSample(id: number): Promise<Sample> {
        const sample = await this.repositoryRedis.get(id);
        return sample;
    }
}