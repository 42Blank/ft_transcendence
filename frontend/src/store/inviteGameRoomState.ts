import { atom } from 'recoil';
import { InviteGameType } from '../types/game';

export const inviteGameRoomState = atom<InviteGameType>({
  key: 'inviteGameRoomState',
  default: {
    id: '',
    nickname: '',
  },
});
