import { Response, NextFunction } from 'express';
import { IncomingMessage } from 'http';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext } from 'winston-context-logger-open-telemetry';

interface Request extends IncomingMessage {
  metadata: {
    [key: string]: string;
  };
  originalUrl: string;
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    RequestContext.setContext(
      request.originalUrl,
      request.headers['x-correlation-id'] as string,
      async () => next(),
    );
    response.on('finish', RequestContext.flush.bind(RequestContext));
  }
}
