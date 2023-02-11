import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import { chatRoomListState } from 'store';
import { ROUTE } from 'common/constants';

export function useGetCurrentChatRoom() {
  const uuid = useLocation().pathname.split('/')[2];
  const chatRoomList = useRecoilValue(chatRoomListState);
  const nav = useNavigate();

  const foundChatRoom = chatRoomList.find(chatRoom => chatRoom.id === uuid);
  if (!foundChatRoom) {
    alert('채팅방을 찾을 수 없습니다!');
    nav(ROUTE.ROOT);
  }

  return foundChatRoom;
}
