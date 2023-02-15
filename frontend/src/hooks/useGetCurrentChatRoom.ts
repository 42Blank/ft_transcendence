import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import { chatRoomListState } from 'store';

export function useGetCurrentChatRoom() {
  const uuid = useLocation().pathname.split('/')[2];
  const chatRoomList = useRecoilValue(chatRoomListState);

  const foundChatRoom = chatRoomList.find(chatRoom => chatRoom.id === uuid);
  if (!foundChatRoom) throw Error('채팅방을 찾을 수 없습니다!');

  return foundChatRoom;
}
