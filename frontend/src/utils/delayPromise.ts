import { AxiosResponse } from 'axios';

// Suspense디버깅용
export function delayPromise(ms: number) {
  return function delay(x: AxiosResponse) {
    return new Promise<AxiosResponse>(resolve => {
      setTimeout(() => resolve(x), ms);
    });
  };
}
