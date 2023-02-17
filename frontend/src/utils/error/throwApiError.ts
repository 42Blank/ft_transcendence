import { AxiosError, isAxiosError } from 'axios';
import { ApiError } from './ApiError';

function isAxiosFtErrorResponse(error: unknown): error is AxiosError<string> {
  if (!isAxiosError(error)) {
    return false;
  }

  if (!error.response) {
    return false;
  }

  const { data } = error.response;
  if (!data || typeof data !== 'string') {
    return false;
  }

  return true;
}

export function throwApiError(error: unknown): never {
  if (isAxiosFtErrorResponse(error)) {
    throw new ApiError(+error.code, error.response.data);
  }

  throw error;
}
