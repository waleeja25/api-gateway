import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter<BadRequestException> {
  private readonly logger = new Logger(BadRequestExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const body = exception.getResponse();

    const message =
      typeof body === 'object' && body !== null && 'message' in body
        ? String(body.message)
        : 'Bad request';

    this.logger.warn(message);

    response.status(exception.getStatus()).json({
      success: false,
      message,
      data: null,
    });
  }
}
