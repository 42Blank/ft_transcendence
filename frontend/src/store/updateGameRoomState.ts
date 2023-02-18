import { atom } from 'recoil';

import { UpdateGameRoomType } from 'types/game';

export const updateGameRoomState = atom<UpdateGameRoomType>({
  key: 'updateGameRoomState',
  default: { id: '' },
});
