import { atom } from 'recoil';

export const inviteGameRoomSocketIdState = atom<string>({
  key: 'inviteGameRoomSocketIdState',
  default: '',
});
