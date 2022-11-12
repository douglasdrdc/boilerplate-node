import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Logger,
} from '@nestjs/common';
import { coreModules } from 'src/core/core-module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure-module';
import { HealthCheckController } from './controller';
import { SampleController } from './controller/sample-controller';
import * as filters from './exception-filter';
import { RequestLoggerMiddleware } from './middleware';

@Module({
  imports: [InfrastructureModule],
  controllers: [HealthCheckController, SampleController],
  providers: [
    ...coreModules,
    ...Object.values(filters),
    {
      provide: Logger,
      useFactory: () => new Logger(),
    },
  ],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .exclude({ path: 'health-check', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
