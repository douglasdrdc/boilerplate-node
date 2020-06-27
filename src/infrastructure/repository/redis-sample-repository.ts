import { injectable } from "inversify";
import redis from "./util/redis";
import SampleRedisRepository from "../../core/domain/infrastructure/repository/sample-redis-repository";
import { DatabaseError } from "../../core/application/exception/error";
import Sample from "../../core/domain/model/sample";

const keyPrefix = 'SAMPLE';
const loggerPrefix = 'Sample';

@injectable()
export default class RedisTalkRepository implements SampleRedisRepository {   
    async get(sampleId: number): Promise<Sample> {
        try {
            const key = `${keyPrefix}:${sampleId}`;
            const talkText = await redis.get(key);
            if (!talkText) return null;

            return JSON.parse(talkText);
        } catch (err) {
            throw new DatabaseError(err, `Error in recovery ${loggerPrefix} by id.`);
        }
    }

    async save(sample: Sample): Promise<void> {
        try {
            const ttl = 600;
            const key = `${keyPrefix}:${sample.id}`;
            const command = redis.multi().set(key, JSON.stringify(sample));
            command.expire(key, ttl);
            await command.exec();
        } catch (err) {
            throw new DatabaseError(err, `Error in save ${loggerPrefix} in redis.`);
        }
    }

    async delete(sample: Sample): Promise<void> {
        try {
            const key = `${keyPrefix}:${sample.id}`;
            await redis.del(key);
        } catch (err) {
            throw new DatabaseError(err, `Error deliting ${loggerPrefix} in redis`);
        }
    }
}