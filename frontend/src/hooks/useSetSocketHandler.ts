import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { ChatDataType, ChatRoomInfoType } from 'types/chat';
import { chatRoomListState, currentChatDataState } from 'store';
import { ROUTE } from 'common/constants';

export function useSetSocketHandler() {
  const setCurrentChatData = useSetRecoilState(currentChatDataState);
  const setChatRoomList = useSetRecoilState(chatRoomListState);
  const nav = useNavigate();

  function connectHandler() {}
  function exceptionHandler(data: Error) {
    // eslint-disable-next-line no-console
    console.log(data); // TODO: 이건 봐줘잉 (디버깅용)
  }
  function disconnectHandler() {}

  function getCurrentChatHandler(data: ChatDataType) {
    setCurrentChatData(prev => [...prev, data]);
  }
  function getAllChatRoomHandler(data: ChatRoomInfoType[]) {
    setChatRoomList(data);
  }
  function joinChatRoomHandler(id: string) {
    nav(`${ROUTE.CHAT}/${id}`);
  }
  return {
    connectHandler,
    exceptionHandler,
    disconnectHandler,
    getCurrentChatHandler,
    getAllChatRoomHandler,
    joinChatRoomHandler,
  };
}
