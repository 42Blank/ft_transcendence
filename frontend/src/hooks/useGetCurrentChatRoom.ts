import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import { chatRoomListState } from 'store';

export function useGetCurrentChatRoom() {
  const uuid = useLocation().pathname.split('/')[2];
  const chatRoomList = useRecoilValue(chatRoomListState);

  return chatRoomList.find(chatRoom => chatRoom.id === uuid);
}
