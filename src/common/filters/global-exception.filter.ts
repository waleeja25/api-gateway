import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

import type { Response } from 'express';

import { mapGrpcException } from '../errors/grpc-error.mapper';
import { mapHttpException } from '../errors/http-error.mapper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost): void {
    const resolved = this.resolveException(exception);
    if (resolved.status >= 500) {
      this.logger.error(
        'Unhandled exception',
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `${resolved.status}: ${JSON.stringify(resolved.body.message)}`,
      );
    }
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(resolved.status).json(resolved.body);
  }

  private resolveException(exception: unknown) {
    if (exception instanceof HttpException) {
      return mapHttpException(exception);
    }

    return mapGrpcException(exception);
  }
}
