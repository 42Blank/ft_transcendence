import { AxiosError, isAxiosError } from 'axios';
import { FtErrorResponse } from './ftErrorResponse';

export function isAxiosFtErrorResponse(error: unknown): error is AxiosError<FtErrorResponse> {
  if (!isAxiosError(error)) {
    return false;
  }

  if (!error.response) {
    return false;
  }

  const { data } = error.response;
  if (!data || !data.error || !data.message || !data.statusCode) {
    return false;
  }

  return true;
}
