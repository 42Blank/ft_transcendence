import { atom } from 'recoil';
import { NewChatRoomType } from 'types/chat';

export const newChatRoomState = atom<NewChatRoomType>({
  key: 'newChatRoomState',
  default: {
    roomTitle: '',
    isPrivate: false,
  },
});
