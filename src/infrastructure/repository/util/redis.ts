import * as Redis from 'ioredis';

const redisUrl: string = process.env.REDIS_URL || 'redis://localhost:6379';
const redisPasswork: string = process.env.REDIS_PASSWORD || null;

export default !!redisPasswork ?
    new Redis(redisUrl, { password: redisPasswork }) : 
    new Redis(redisUrl);