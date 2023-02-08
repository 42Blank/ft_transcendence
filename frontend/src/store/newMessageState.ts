import { atom } from 'recoil';

export const newMessageState = atom<string>({
  key: 'newMessageState',
  default: '',
});
