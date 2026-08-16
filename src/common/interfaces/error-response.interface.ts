export interface ErrorResponse {
  success: false;
  message: string | string[];
  data: null;
}

export interface ResolvedError {
  status: number;
  body: ErrorResponse;
}
