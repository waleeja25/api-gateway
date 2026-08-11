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
    this.logger.error(
      'Unhandled exception',
      exception instanceof Error ? exception.stack : String(exception),
    );
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const resolved = this.resolveException(exception);

    response.status(resolved.status).json(resolved.body);
  }

  private resolveException(exception: unknown) {
    if (exception instanceof HttpException) {
      return mapHttpException(exception);
    }

    return mapGrpcException(exception);
  }
}
