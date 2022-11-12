import { Injectable } from '@nestjs/common';
import { Sample } from '../model/sample';
import { SampleRepository } from '../repository/sample-repository';

@Injectable()
export class BaseSampleService {
  constructor(private readonly repository: SampleRepository) {}

  async getAll(): Promise<Sample[]> {
    const result = await this.repository.getAll();
    return result;
  }

  async getById(id: string): Promise<Sample | null> {
    const result = await this.repository.getById(id);
    return result;
  }

  async create(sample: Sample): Promise<string> {
    const result = await this.repository.create(sample);
    return result;
  }
}
