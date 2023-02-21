import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { ROUTE } from 'common/constants';
import { chatRoomListState, currentChatDataState, gameRoomListState, onlineUserListState } from 'store';
import { ChatDataType, ChatRoomInfoType } from 'types/chat';

import { GameRoomInfoType } from 'types/game';

export function useSetSocketHandler() {
  const setCurrentChatData = useSetRecoilState(currentChatDataState);
  const setOnlineUserList = useSetRecoilState(onlineUserListState);
  const setChatRoomList = useSetRecoilState(chatRoomListState);
  const setGameRoomList = useSetRecoilState(gameRoomListState);
  const nav = useNavigate();

  function connectHandler() {}
  function exceptionHandler(data: Error) {
    // eslint-disable-next-line no-console
    console.log(data); // TODO: 이건 봐줘잉 (디버깅용)
  }
  function disconnectHandler() {}

  function getOnlineUserListHandler(data: number[]) {
    setOnlineUserList(data);
  }

  function getCurrentChatHandler(data: ChatDataType) {
    setCurrentChatData(prev => [data, ...prev]);
  }
  function getAllChatRoomHandler(data: ChatRoomInfoType[]) {
    setChatRoomList(data);
  }
  function joinChatRoomHandler(id: string) {
    nav(`${ROUTE.CHAT}/${id}`);
  }

  /* Game */
  function getAllGameRoomHandler(data: GameRoomInfoType[]) {
    setGameRoomList(data);
  }
  function joinGameRoomHandler(id: string) {
    nav(`${ROUTE.GAME}/${id}`);
  }

  return {
    connectHandler,
    exceptionHandler,
    disconnectHandler,
    getOnlineUserListHandler,
    getCurrentChatHandler,
    getAllChatRoomHandler,
    joinChatRoomHandler,
    getAllGameRoomHandler,
    joinGameRoomHandler,
  };
}
