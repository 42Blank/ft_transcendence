import { atom } from 'recoil';

import { ChatRoomInfoType } from 'types/chat';

export const chatRoomListState = atom<ChatRoomInfoType[]>({
  key: 'chatRoomListState',
  default: [],
});
