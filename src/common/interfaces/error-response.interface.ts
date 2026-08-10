export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
}

export interface ResolvedError {
  status: number;
  body: ErrorResponse;
}
