import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import type { Response } from 'express';
import type { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter<BadRequestException> {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const status = exception.getStatus();
    const message = this.resolveMessage(exception.getResponse());

    const response = host.switchToHttp().getResponse<Response>();

    response.status(status).json({
      success: false,
      message,
      data: null,
    });
  }

  private resolveMessage(body: unknown): string {
    const raw = this.extractRawMessage(body);

    if (this.isValidationErrors(raw)) {
      return raw
        .map((error) => Object.values(error.constraints ?? {})[0])
        .filter((message): message is string => !!message)
        .join('; ');
    }

    if (typeof raw === 'string') {
      return raw;
    }

    if (Array.isArray(raw)) {
      return raw.join('; ');
    }

    return 'Bad request';
  }

  private extractRawMessage(body: unknown): unknown {
    if (typeof body === 'object' && body !== null && 'message' in body) {
      return (body as { message?: unknown }).message;
    }

    return body;
  }

  private isValidationErrors(value: unknown): value is ValidationError[] {
    return (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === 'object' &&
      value[0] !== null &&
      'property' in value[0] &&
      'constraints' in value[0]
    );
  }
}
