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
    this.logger.error('=== GRPC EXCEPTION FILTER ===');

    this.logger.error(
      'Exception:',
      exception instanceof Error
        ? exception.stack
        : JSON.stringify(exception, null, 2),
    );

    this.logger.error(
      'Exception type:',
      exception?.constructor?.name ?? 'unknown',
    );

    if (typeof exception === 'object' && exception !== null) {
      this.logger.error(
        'Exception code:',
        'code' in exception
          ? String((exception as { code?: unknown }).code)
          : 'NO CODE',
      );

      this.logger.error(
        'Exception details:',
        'details' in exception
          ? String((exception as { details?: unknown }).details)
          : 'NO DETAILS',
      );

      this.logger.error(
        'Exception message:',
        'message' in exception
          ? String((exception as { message?: unknown }).message)
          : 'NO MESSAGE',
      );
    }

    this.logger.error('==============================');
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
