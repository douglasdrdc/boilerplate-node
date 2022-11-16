import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogger } from 'src/core/domain/utils';
const STATUS_SCALE = 100;
const SUCCESS = 2;
const CLIENT_ERROR = 4;
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private logger: AppLogger) {}

  private logResponse(
    timestamp: number,
    req: Request,
    res: Response,
  ): () => void {
    return () => {
      try {
        const requestData = `"${req.method} ${req.url} HTTP/${req.httpVersion}"`;
        const responseTime = Date.now() - timestamp;
        const responseData = `${res.statusCode} ${responseTime}ms`;

        const logFormat = `${requestData} ${responseData}`;
        this.logger[this.getLevel(res.statusCode)](logFormat, {
          requestPath: req.url,
          responseStatusCode: res.statusCode,
          responseTime,
          originIp: req.ip,
          userAgent: req.headers['user-agent'] || '',
        });
      } catch (err) {
        this.logger.addMeta(
          'warnError',
          (err as Error).stack ?? (err as Error).message,
        );
      }
    };
  }

  private getLevel(statusCode: number) {
    switch (Math.floor(statusCode / STATUS_SCALE)) {
      case SUCCESS:
      case CLIENT_ERROR:
        return 'info';
      default:
        return 'error';
    }
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const now = Date.now();

    response.on('finish', this.logResponse(now, request, response));

    next();
  }
}
