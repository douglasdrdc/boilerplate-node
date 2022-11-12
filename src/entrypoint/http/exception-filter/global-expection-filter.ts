import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).send(exception.getResponse());
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      const request = ctx.getRequest<FastifyRequest>();
      this.logger.error('Internal Server Error', {
        error: exception.stack,
        url: request.url,
        payload: JSON.stringify(request.body),
      });

      response.status(status).send({
        statusCode: status,
        message: 'Internal Server Error',
      });
    }
  }
}
