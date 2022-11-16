import { fluent } from '@codibre/fluent-iterable';
import { Injectable } from '@nestjs/common';
import { DatabaseException } from 'src/core/domain/exception';
import { SampleRepository } from 'src/core/domain/repository/sample-repository';
import { v4 as uuidv4 } from 'uuid';
import { Sample } from '../../core/domain/model/sample';
import { RedisSample } from './redis-sample';

const keyPrefix = 'SAMPLE';
const loggerPrefix = 'Sample';

@Injectable()
export class RedisSampleRepository implements SampleRepository {
  constructor(private redis: RedisSample) {}
  async getAll(): Promise<Sample[]> {
    try {
      const key = `${keyPrefix}:*`;
      const keys = await this.redis.keys(key);
      if ((keys || []).length <= 0) return [];

      const values = await this.redis.mget(keys);
      if ((values || []).length <= 0) return [];

      const samples: Array<Sample> = fluent(values)
        .filter()
        .map((value) => JSON.parse(value))
        .toArray();
      return samples;
    } catch (err) {
      throw new DatabaseException(
        err,
        `Error in recovery ${loggerPrefix} collection.`,
      );
    }
  }

  async getById(sampleId: string): Promise<Sample | null> {
    try {
      const key = `${keyPrefix}:${sampleId}`;
      const resultText = await this.redis.get(key);
      if (!resultText) return null;

      return JSON.parse(resultText);
    } catch (err) {
      throw new DatabaseException(
        err,
        `Error in recovery ${loggerPrefix} by id.`,
      );
    }
  }

  async create(sample: Sample): Promise<string> {
    try {
      const ttl = 600;
      const id = uuidv4();
      const key = `${keyPrefix}:${id}`;
      const command = this.redis.multi().set(
        key,
        JSON.stringify({
          id,
          name: sample.name,
        }),
      );
      command.expire(key, ttl);
      await command.exec();
      return id;
    } catch (err) {
      throw new DatabaseException(
        err,
        `Error in save ${loggerPrefix} in redis.`,
      );
    }
  }

  async delete(sampleId: number): Promise<void> {
    try {
      const key = `${keyPrefix}:${sampleId}`;
      await this.redis.del(key);
    } catch (err) {
      throw new DatabaseException(
        err,
        `Error deliting ${loggerPrefix} in redis`,
      );
    }
  }
}
