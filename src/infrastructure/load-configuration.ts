import { fluentObject } from '@codibre/fluent-iterable';
import ms from 'ms';
import { RedisConfig } from './repository';

export enum ConfigTypes {
  httpServer = 'httpServer',
  sampleRedis = 'sampleRedis',
}

export class HttpServerConfig {
  port!: number;
  keepAliveTimeout!: number;
}

export interface Config {
  [ConfigTypes.httpServer]: HttpServerConfig;
  [ConfigTypes.sampleRedis]: RedisConfig;
}
const config = {
  [ConfigTypes.httpServer]: {
    port: 3000,
    keepAliveTimeout: ms('2m'),
  },
  [ConfigTypes.sampleRedis]: {
    url: 'redis://localhost:6379',
    options: {
      password: undefined,
    },
  },
} as Config;

export async function loadConfiguration(): Promise<Config> {
  const { env } = process;
  const newConfig: Config = {
    [ConfigTypes.httpServer]: {
      port: Number(env.HTTP_PORT) || config[ConfigTypes.httpServer].port,
      keepAliveTimeout:
        Number(env.KEEP_ALIVE_TIMEOUT) ||
        config[ConfigTypes.httpServer].keepAliveTimeout,
    },
    [ConfigTypes.sampleRedis]: {
      url: env.REDIS_URL ?? config[ConfigTypes.sampleRedis].url,
      options: {
        password:
          env.REDIS_PASSWORD ||
          config[ConfigTypes.sampleRedis].options.password,
      },
    },
  };
  fluentObject(config).forEach(([k]) => {
    Object.assign(config[k], newConfig[k]);
  });

  return config;
}
