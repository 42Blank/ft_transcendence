import { atom } from 'recoil';
import { NewGameRoomType } from 'types/game';

export const newGameRoomState = atom<NewGameRoomType>({
  key: 'newGameRoomState',
  default: {
    created: false,
  },
});
