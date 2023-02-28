import { atom } from 'recoil';
import { OnlineUserType } from 'types/user';

export const onlineUserListState = atom<OnlineUserType[]>({
  key: 'onlineUserListState',
  default: [],
});
