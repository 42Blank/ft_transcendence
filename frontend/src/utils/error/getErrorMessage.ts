import { FtError } from './ftError';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof FtError) {
    return error.message;
  }

  return (error as Error).message;
};
