import { FtError } from './ftError';

export function isFtError(error: unknown): error is FtError {
  if (error instanceof FtError) {
    return true;
  }

  return false;
}
