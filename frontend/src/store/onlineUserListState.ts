import { atom } from 'recoil';

export const onlineUserListState = atom<number[]>({
  key: 'onlineUserListState',
  default: [],
});
