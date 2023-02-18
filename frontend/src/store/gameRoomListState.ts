import { atom } from 'recoil';

import { GameRoomInfoType } from 'types/game';

export const gameRoomListState = atom<GameRoomInfoType[]>({
  key: 'gameRoomListState',
  default: [],
});
