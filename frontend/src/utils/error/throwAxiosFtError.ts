import { FtError } from './ftError';
import { isAxiosFtErrorResponse } from './isAxiosFtErrorResponse';

export function throwAxiosFtError(error: unknown): never {
  if (isAxiosFtErrorResponse(error)) {
    throw new FtError(error.response.data);
  }

  throw error;
}
