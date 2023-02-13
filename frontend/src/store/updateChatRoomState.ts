import { atom } from 'recoil';

import { UpdateChatRoomType } from 'types/chat';

export const updateChatRoomState = atom<UpdateChatRoomType>({
  key: 'updateChatRoomState',
  default: { chatRoomId: '', roomTitle: '', isPrivate: false },
});
