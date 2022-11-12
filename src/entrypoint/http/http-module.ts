import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { coreModules } from 'src/core/core-module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure-module';
import { HealthCheckController } from './controller';
import { SampleController } from './controller/sample-controller';
import * as filters from './exception-filter';
import {
  RequestContextMiddleware,
  RequestLoggerMiddleware,
} from './middleware';
import { logger } from './logger';
import { AppLogger } from 'src/core/domain/utils';

@Module({
  imports: [InfrastructureModule],
  controllers: [HealthCheckController, SampleController],
  providers: [
    ...coreModules,
    ...Object.values(filters),
    {
      provide: AppLogger,
      useValue: logger,
    },
  ],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestContextMiddleware)
      .forRoutes('*')
      .apply(RequestLoggerMiddleware)
      .exclude({ path: 'health-check', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
