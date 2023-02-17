import { FtErrorResponse } from './ftErrorResponse';

export class FtError extends Error {
  statusCode: number;

  constructor(errorResponse: FtErrorResponse) {
    super(errorResponse.message);
    this.name = `FtError(${errorResponse.error})`;
    this.statusCode = errorResponse.statusCode;
  }
}
