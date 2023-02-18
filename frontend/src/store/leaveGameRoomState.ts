import { atom } from 'recoil';

import { LeaveGameRoomType } from 'types/game';

export const leaveGameRoomState = atom<LeaveGameRoomType>({
  key: 'leaveGameRoomState',
  default: { id: '' },
});
