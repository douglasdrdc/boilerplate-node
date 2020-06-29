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

    async getAll(): Promise<Sample[]> {
        const result = await this.repositoryRedis.getAll();
        return result;
    }

    async getById(id: string): Promise<Sample> {
        const result = await this.repositoryRedis.getById(id);
        return result;
    }

    async create(sample: Sample): Promise<string> {
        const result = await this.repositoryRedis.create(sample);
        return result;
    }
}