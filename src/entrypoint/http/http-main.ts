import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import qs = require('qs');
import { GlobalExceptionsFilter } from './exception-filter';
import { HttpModule } from './http-module';
import { sync } from 'read-pkg';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpServerConfig } from 'src/infrastructure/load-configuration';
import * as api from '@opentelemetry/api';
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks';

export async function httpMain() {
  const contextManager = new AsyncHooksContextManager();
  contextManager.enable();
  api.context.setGlobalContextManager(contextManager);

  const app = await NestFactory.create(
    HttpModule,
    new FastifyAdapter({
      bodyLimit: 52428800,
      maxParamLength: 52428800,
      querystringParser: qs.parse.bind(qs),
    }),
  );

  app.useGlobalFilters(app.get(GlobalExceptionsFilter));
  const { name, version } = sync();
  const options = new DocumentBuilder()
    .setTitle(name)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  const { port, keepAliveTimeout } = app.get(HttpServerConfig);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port, '0.0.0.0');
  app.getHttpServer().keepAliveTimeout = keepAliveTimeout;
}
