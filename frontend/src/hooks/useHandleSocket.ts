import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { joinChatRoomState, leaveChatRoomState, newChatRoomState, newMessageState } from 'store';
import { ChatDataType, ChatRoomInfoType } from 'types/chat';
import { useSetSocketHandler } from './useSetSocketHandler';

export const sockets: {
  chatSocket: Socket | null;
} = {
  chatSocket: null,
};

function createSocket(
  namespace: string,
  handler?: {
    connectHandler: () => void;
    exceptionHandler: (data: Error) => void;
    disconnectHandler: (reason: string) => void;
    getCurrentChatHandler: (data: ChatDataType) => void;
    getAllChatRoomHandler: (data: ChatRoomInfoType[]) => void;
    joinChatRoomHandler: (id: string) => void;
  },
) {
  const socket = io(`${process.env.REACT_APP_SERVER as string}/${namespace}`, {
    withCredentials: true,
  });

  if (handler) {
    socket.on('connect', handler.connectHandler);
    socket.on('disconnect', handler.disconnectHandler);
    socket.on('exception', handler.exceptionHandler);
    socket.on('chat_message', handler.getCurrentChatHandler);
    socket.on('update_chat_room', handler.getAllChatRoomHandler);
    socket.on('join_room', handler.joinChatRoomHandler);
  }

  return socket;
}

export function useHandleSocket() {
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const newChatRoom = useRecoilValue(newChatRoomState);
  const resetNewChatRoom = useResetRecoilState(newChatRoomState);
  const joinChatRoom = useRecoilValue(joinChatRoomState);
  const resetJoinChatRoom = useResetRecoilState(joinChatRoomState);
  const leaveChatRoom = useRecoilValue(leaveChatRoomState);
  const resetLeaveChatRoom = useResetRecoilState(leaveChatRoomState);

  const {
    connectHandler,
    exceptionHandler,
    disconnectHandler,
    getCurrentChatHandler,
    getAllChatRoomHandler,
    joinChatRoomHandler,
  } = useSetSocketHandler();

  useEffect(() => {
    if (newMessage.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('chat_message', {
      message: newMessage,
      timestamp: new Date().toString(),
    });

    setNewMessage('');
  }, [newMessage]);

  useEffect(() => {
    if (newChatRoom.roomTitle.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('create_room', newChatRoom);
    resetNewChatRoom();
  }, [newChatRoom]);

  useEffect(() => {
    if (joinChatRoom.id.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('join_room', joinChatRoom);
    resetJoinChatRoom();
  }, [joinChatRoom]);

  useEffect(() => {
    if (leaveChatRoom.id.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('leave_room', leaveChatRoom);
    resetLeaveChatRoom();
  }, [leaveChatRoom]);

  useEffect(() => {
    if (!sockets.chatSocket) {
      sockets.chatSocket = createSocket('chat', {
        connectHandler,
        exceptionHandler,
        disconnectHandler,
        getCurrentChatHandler,
        getAllChatRoomHandler,
        joinChatRoomHandler,
      });
    }
  }, []);
}
