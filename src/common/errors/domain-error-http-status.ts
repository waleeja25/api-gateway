import { HttpStatus } from '@nestjs/common';

export const DOMAIN_ERROR_HTTP_STATUS: Record<string, HttpStatus> = {
  ENTITY_NOT_FOUND: HttpStatus.NOT_FOUND,

  USER_EMAIL_EXISTS: HttpStatus.CONFLICT,
};
