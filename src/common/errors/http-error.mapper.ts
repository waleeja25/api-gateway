import { HttpException, HttpStatus } from '@nestjs/common';

import type { ResolvedError } from '../interfaces';

export function mapHttpException(exception: HttpException): ResolvedError {
  const status = exception.getStatus();
  const response = exception.getResponse();

  let message: string | string[] = exception.message;

  if (
    typeof response === 'object' &&
    response !== null &&
    'message' in response
  ) {
    const responseMessage = (
      response as {
        message?: string | string[];
      }
    ).message;

    if (typeof responseMessage === 'string' || Array.isArray(responseMessage)) {
      message = responseMessage;
    }
  }

  return {
    status,
    body: {
      statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    },
  };
}
