import { AxiosError } from 'axios';

export function throwError(error: Error | AxiosError) {
  if (error instanceof AxiosError) throw Error(error.response?.data ?? 'Unknown error');
  throw error;
}
