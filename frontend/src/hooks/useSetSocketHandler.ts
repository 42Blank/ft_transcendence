import { useSetRecoilState } from 'recoil';

import { ChatDataType } from 'types/chat';
import { currentChatDataState } from 'store';

export function useSetSocketHandler() {
  const setCurrentChatData = useSetRecoilState(currentChatDataState);
  function connectHandler() {}
  function disconnectHandler() {}
  function eventsToClientHandler(data: ChatDataType) {
    setCurrentChatData(prev => [...prev, data]);
  }
  return { connectHandler, disconnectHandler, eventsToClientHandler };
}
