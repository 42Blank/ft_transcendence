import { atom } from 'recoil';

export const takeOperatorState = atom<number>({
  key: 'takeOperatorState',
  default: -1,
});
