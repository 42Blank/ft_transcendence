import { ApiError } from './ApiError';

export function isApiError(error: unknown): error is ApiError {
  if (error instanceof ApiError) {
    return true;
  }

  return false;
}
