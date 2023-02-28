import { AxiosError, isAxiosError } from 'axios';
import { ApiError } from './ApiError';

function isAxiosApiError(error: unknown): error is AxiosError<{
  message: string;
}> {
  if (!isAxiosError(error)) {
    return false;
  }

  if (!error.response) {
    return false;
  }

  const { data } = error.response;
  if (!data || !data.message || typeof data.message !== 'string') {
    return false;
  }

  return true;
}

export function throwApiError(error: unknown): never {
  if (isAxiosApiError(error)) {
    throw new ApiError(error.response.status, error.response.data.message);
  }

  throw error;
}
