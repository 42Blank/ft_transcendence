import { atom } from 'recoil';
import { JoinSpectateRoomType } from 'types/game';

export const joinSpectateRoomState = atom<JoinSpectateRoomType>({
  key: 'joinSpectateRoomState',
  default: {
    id: '',
  },
});
