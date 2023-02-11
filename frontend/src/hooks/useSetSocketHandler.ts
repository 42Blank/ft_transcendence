import { useSetRecoilState } from 'recoil';

import { ChatDataType, ChatRoomInfoType } from 'types/chat';
import { chatRoomListState, currentChatDataState } from 'store';

export function useSetSocketHandler() {
  const setCurrentChatData = useSetRecoilState(currentChatDataState);
  const setChatRoomList = useSetRecoilState(chatRoomListState);

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
  return { connectHandler, exceptionHandler, disconnectHandler, getCurrentChatHandler, getAllChatRoomHandler };
}
