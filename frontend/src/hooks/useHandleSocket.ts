import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import {
  joinChatRoomState,
  leaveChatRoomState,
  newChatRoomState,
  newGamePingMessageState,
  newMessageState,
  updateChatRoomState,
} from 'store';
import { useSetSocketHandler } from './useSetSocketHandler';

export const sockets: {
  chatSocket: Socket | null;
  gameSocket: Socket | null;
} = {
  chatSocket: null,
  gameSocket: null,
};

function createSocket(
  namespace: string,
  handler?: {
    connectHandler: () => void;
    exceptionHandler: (data: Error) => void;
    disconnectHandler: (reason: string) => void;
  },
) {
  const socket = io(`${process.env.REACT_APP_SERVER as string}/${namespace}`, {
    withCredentials: true,
  });

  if (handler) {
    socket.on('connect', handler.connectHandler);
    socket.on('disconnect', handler.disconnectHandler);
    socket.on('exception', handler.exceptionHandler);
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
  const updateChatRoom = useRecoilValue(updateChatRoomState);
  const resetUpdateChatRoom = useResetRecoilState(updateChatRoomState);

  const [newGamePingMessage, setNewGamePingMessage] = useRecoilState(newGamePingMessageState);

  const {
    connectHandler,
    exceptionHandler,
    disconnectHandler,
    getCurrentChatHandler,
    getAllChatRoomHandler,
    joinChatRoomHandler,
    gamePongHandler,
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
    if (leaveChatRoom.id.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('leave_room', leaveChatRoom);
    resetLeaveChatRoom();
  }, [leaveChatRoom]);

  useEffect(() => {
    if (joinChatRoom.id.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('join_room', joinChatRoom);
    resetJoinChatRoom();
  }, [joinChatRoom]);

  useEffect(() => {
    if (updateChatRoom.id.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('update_room', updateChatRoom);
    resetUpdateChatRoom();
  }, [updateChatRoom]);

  /* game */
  useEffect(() => {
    if (newMessage.length === 0) return;
    if (sockets.gameSocket === null) return;

    sockets.gameSocket.emit('ping', {
      message: newMessage,
    });

    setNewGamePingMessage('');
  }, [newGamePingMessage]);

  useEffect(() => {
    if (!sockets.chatSocket) {
      sockets.chatSocket = createSocket('chat', {
        connectHandler,
        exceptionHandler,
        disconnectHandler,
      });
      sockets.chatSocket.on('chat_message', getCurrentChatHandler);
      sockets.chatSocket.on('update_chat_room', getAllChatRoomHandler);
      sockets.chatSocket.on('join_room', joinChatRoomHandler);
    }
    if (!sockets.gameSocket) {
      sockets.gameSocket = createSocket('game', {
        connectHandler,
        exceptionHandler,
        disconnectHandler,
      });
      sockets.gameSocket.on('pong', gamePongHandler);
    }
  }, []);
}
