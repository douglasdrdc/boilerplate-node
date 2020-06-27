import * as Redis from 'ioredis';

const redisUrl: string = process.env.REDIS_URL || 'redis://localhost:6379';

export default new Redis(redisUrl);