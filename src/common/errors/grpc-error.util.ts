export interface GrpcError {
  code: number;
  details?: string;
  message?: string;
}

export function getGrpcError(exception: unknown): GrpcError | null {
  if (typeof exception !== 'object' || exception === null) {
    return null;
  }

  if (!('code' in exception) || typeof exception.code !== 'number') {
    return null;
  }

  return {
    code: exception.code,

    details:
      'details' in exception && typeof exception.details === 'string'
        ? exception.details
        : undefined,

    message:
      'message' in exception && typeof exception.message === 'string'
        ? exception.message
        : undefined,
  };
}

export interface DomainErrorPayload {
  code: string;
  message: string;
}

export function getDomainError(error: GrpcError): DomainErrorPayload | null {
  const candidates = [error.details, error.message];

  for (const value of candidates) {
    if (!value) {
      continue;
    }

    const parsed = parseDomainError(value);

    if (parsed) {
      return parsed;
    }
  }

  return null;
}

function parseDomainError(value: string): DomainErrorPayload | null {
  try {
    const parsed: unknown = JSON.parse(value);

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('code' in parsed) ||
      !('message' in parsed) ||
      typeof parsed.code !== 'string' ||
      typeof parsed.message !== 'string'
    ) {
      return null;
    }

    return {
      code: parsed.code,
      message: parsed.message,
    };
  } catch {
    return null;
  }
}
