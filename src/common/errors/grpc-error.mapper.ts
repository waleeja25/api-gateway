import { HttpStatus } from '@nestjs/common';

import type { ResolvedError } from '../interfaces';
import { DOMAIN_ERROR_HTTP_STATUS } from './domain-error-http-status';
import { getDomainError, getGrpcError } from './grpc-error.util';
import { mapGrpcStatusToHttp } from './grpc-status.util';

export function mapGrpcException(exception: unknown): ResolvedError {
  const grpcError = getGrpcError(exception);

  if (!grpcError) {
    return createInternalServerError();
  }

  const domainError = getDomainError(grpcError);

  if (domainError) {
    const status =
      DOMAIN_ERROR_HTTP_STATUS[domainError.code] ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    return {
      status,
      body: {
        success: false,
        message: domainError.message,
        data: null,
      },
    };
  }

  const status = mapGrpcStatusToHttp(grpcError.code);

  return {
    status,
    body: {
      success: false,
      message:
        grpcError.details ?? grpcError.message ?? 'Internal server error',
      data: null,
    },
  };
}

function createInternalServerError(): ResolvedError {
  return {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    body: {
      success: false,
      message: 'Internal server error',
      data: null,
    },
  };
}
