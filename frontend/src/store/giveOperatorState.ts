import { atom } from 'recoil';

export const giveOperatorState = atom<number>({
  key: 'giveOperatorState',
  default: -1,
});
