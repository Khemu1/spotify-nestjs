export class CustomError extends Error {
  statusCode: number;
  status: string;
  safe: boolean;
  type: string;
  details?: string;
  errors?: Record<string, string>;

  constructor(
    message: string,
    statusCode = 500,
    type = 'server error',
    safe = false,
    details?: string,
    errors?: Record<string, string>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 200 && statusCode < 300 ? 'success' : 'fail';
    this.safe = safe;
    this.type = type;
    this.details = details;
    this.errors = errors;
  }
}
