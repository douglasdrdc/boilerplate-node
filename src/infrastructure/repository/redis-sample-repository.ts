import { injectable } from "inversify";
import { v4 as uuidv4 } from 'uuid';
import { DatabaseError } from "../../core/application/exception/error";
import SampleRepository from "../../core/domain/infrastructure/repository/sample-repository";
import Sample from "../../core/domain/model/sample";
import redis from "./util/redis";

const keyPrefix = 'SAMPLE';
const loggerPrefix = 'Sample';

@injectable()
export default class RedisSampleRepository implements SampleRepository {
    async getAll(): Promise<Sample[]> {
        try {
            const key = `${keyPrefix}:*`;
            const keys = await redis.keys(key);
            if ((keys || []).length <= 0) return null;

            const values: Array<string> = await redis.mget(keys);
            if ((values || []).length <= 0) return null;
            
            const samples: Array<Sample> = values.map((value) => 
                JSON.parse(value)
            );
            return samples;
        } catch (err) {
            throw new DatabaseError(err, `Error in recovery ${loggerPrefix} collection.`);
        }
    }
    
    async getById(sampleId: string): Promise<Sample> {
        try {
            const key = `${keyPrefix}:${sampleId}`;
            const resultText = await redis.get(key);
            if (!resultText) return null;

            return JSON.parse(resultText);
        } catch (err) {
            throw new DatabaseError(err, `Error in recovery ${loggerPrefix} by id.`);
        }
    }

    async create(sample: Sample): Promise<string> {
        try {
            const ttl = 600;
            const id = uuidv4();
            const key = `${keyPrefix}:${id}`;
            const command = redis.multi().set(key, JSON.stringify({
                id,
                name: sample.name,
            }));
            command.expire(key, ttl);
            await command.exec();
            return id;
        } catch (err) {
            throw new DatabaseError(err, `Error in save ${loggerPrefix} in redis.`);
        }
    }

    async delete(sampleId: number): Promise<void> {
        try {
            const key = `${keyPrefix}:${sampleId}`;
            await redis.del(key);
        } catch (err) {
            throw new DatabaseError(err, `Error deliting ${loggerPrefix} in redis`);
        }
    }
}