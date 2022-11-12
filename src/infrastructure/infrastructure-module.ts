import { Module } from '@nestjs/common';
import { SampleClient } from 'src/core/domain/client/sample-client';
import { SampleRepository } from 'src/core/domain/repository/sample-repository';
import { ApiSampleClient } from './client/api-sample-client';
import { RedisSample } from './repository/redis-sample';
import { RedisSampleRepository } from './repository/redis-sample-repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ConfigTypes,
  HttpServerConfig,
  loadConfiguration,
} from './load-configuration';
import { RedisConfig } from './repository';
import { configGetter } from './config-getter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfiguration],
    }),
  ],
  providers: [
    {
      provide: SampleClient,
      useClass: ApiSampleClient,
    },
    {
      provide: SampleRepository,
      useClass: RedisSampleRepository,
    },
    {
      provide: RedisSample,
      useFactory: (config: RedisConfig) =>
        new RedisSample(config.url, config.options),
      inject: [RedisConfig],
    },
    {
      provide: RedisConfig,
      useFactory: configGetter(ConfigTypes.sampleRedis),
      inject: [ConfigService],
    },
    {
      provide: HttpServerConfig,
      useFactory: configGetter(ConfigTypes.httpServer),
      inject: [ConfigService],
    },
  ],
  exports: [SampleClient, SampleRepository],
})
export class InfrastructureModule {}
