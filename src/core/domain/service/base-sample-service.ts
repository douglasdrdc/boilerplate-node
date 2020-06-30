import { injectable, inject } from 'inversify';
import SampleService from "./interface/sample-service";
import Sample from '../model/sample';
import { CORE_TYPES } from '../../types';
import SampleRepository from '../infrastructure/repository/sample-repository';

@injectable()
export default class BaseSampleService implements SampleService {
    constructor(
        @inject(CORE_TYPES.SampleRepository) private readonly repositoryRedis: SampleRepository
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