import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import {
  joinChatRoomState,
  leaveChatRoomState,
  newChatRoomState,
  newMessageState,
  updateChatRoomState,
  joinGameRoomState,
  newGameRoomState,
  leaveGameRoomState,
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

  /* Game Room */
  const newGameRoom = useRecoilValue(newGameRoomState);
  const resetNewGameRoom = useResetRecoilState(newGameRoomState);
  const joinGameRoom = useRecoilValue(joinGameRoomState);
  const resetJoinGameRoom = useResetRecoilState(joinGameRoomState);
  const leaveGameRoom = useRecoilValue(leaveGameRoomState);
  const resetLeaveGameRoom = useResetRecoilState(leaveGameRoomState);

  const {
    connectHandler,
    exceptionHandler,
    disconnectHandler,
    getCurrentChatHandler,
    getAllChatRoomHandler,
    joinChatRoomHandler,
    // Game
    joinGameRoomHandler,
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

  /* ----------------- Game Room List ----------------- */
  useEffect(() => {
    if (newGameRoom.created === false) return;
    if (sockets.gameSocket === null) return;

    sockets.gameSocket.emit('create_room', newGameRoom);
    resetNewGameRoom();
  }, [newGameRoom]);

  useEffect(() => {
    if (leaveGameRoom.id.length === 0) return;
    if (sockets.gameSocket === null) return;

    sockets.gameSocket.emit('leave_room', leaveGameRoom);
    resetLeaveGameRoom();
  }, [leaveGameRoom]);

  useEffect(() => {
    if (joinGameRoom.id.length === 0) return;
    if (sockets.gameSocket === null) return;

    sockets.gameSocket.emit('join_room', joinGameRoom);
    resetJoinGameRoom();
  }, [joinGameRoom]);

  /* ----------------- Game ----------------- */
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
      sockets.gameSocket.on('join_room', joinGameRoomHandler);
    }
  }, []);
}
