import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter<BadRequestException> {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const body = exception.getResponse();

    const message =
      typeof body === 'object' && body !== null && 'message' in body
        ? String(body.message)
        : 'Bad request';

    response.status(exception.getStatus()).json({
      success: false,
      message,
      data: null,
    });
  }
}
