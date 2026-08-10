import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import type { Response } from 'express';

import { mapGrpcException } from '../errors/grpc-error.mapper';
import { mapHttpException } from '../errors/http-error.mapper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
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
