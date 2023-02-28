import { MutableRefObject } from 'react';

export function checkInputRefValid(ref: MutableRefObject<HTMLInputElement>, maxLength?: number): boolean {
  if (!ref.current || !ref.current.value || ref.current.value.length === 0) return false;
  if (maxLength && ref.current.value.length > maxLength) return false;
  return true;
}
