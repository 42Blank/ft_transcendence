import { atom } from 'recoil';
import { JoinGameRoomType } from 'types/game';

export const joinGameRoomState = atom<JoinGameRoomType>({
  key: 'joinGameRoomState',
  default: {
    id: '',
  },
});
