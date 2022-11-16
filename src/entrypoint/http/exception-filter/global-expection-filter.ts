import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AppLogger } from 'src/core/domain/utils';

@Injectable()
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private logger: AppLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).send(exception.getResponse());
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.addMeta(
        'unhandledError',
        exception.stack ?? exception.message,
      );

      response.status(status).send({
        statusCode: status,
        message: 'Internal Server Error',
      });
    }
  }
}
