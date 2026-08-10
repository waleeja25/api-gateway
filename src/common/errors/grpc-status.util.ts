import { HttpStatus } from '@nestjs/common';
import { status as GrpcStatus } from '@grpc/grpc-js';

export function mapGrpcStatusToHttp(grpcCode: number): HttpStatus {
  switch (grpcCode) {
    case Number(GrpcStatus.INVALID_ARGUMENT):
      return HttpStatus.BAD_REQUEST;

    case Number(GrpcStatus.NOT_FOUND):
      return HttpStatus.NOT_FOUND;

    case Number(GrpcStatus.ALREADY_EXISTS):
      return HttpStatus.CONFLICT;

    case Number(GrpcStatus.FAILED_PRECONDITION):
      return HttpStatus.PRECONDITION_FAILED;

    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
