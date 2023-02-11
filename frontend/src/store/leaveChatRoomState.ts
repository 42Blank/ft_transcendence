import { atom } from 'recoil';

import { LeaveChatRoomType } from 'types/chat';

export const leaveChatRoomState = atom<LeaveChatRoomType>({
  key: 'leaveChatRoomState',
  default: { id: '' },
});
