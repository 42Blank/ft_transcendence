import { atom } from 'recoil';
import { JoinChatRoomType } from 'types/chat';

export const joinChatRoomState = atom<JoinChatRoomType>({
  key: 'joinChatRoomState',
  default: {
    id: '',
  },
});
