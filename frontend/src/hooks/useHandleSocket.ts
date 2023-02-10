/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { io, Socket } from 'socket.io-client';
import { newMessageState, userState } from '../store';
import { ChatDataType } from '../types/chat';
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
    disconnectHandler: (reason: string) => void;
    eventsToClientHandler: (data: ChatDataType) => void;
  },
) {
  const socket = io(`${process.env.REACT_APP_SERVER as string}/${namespace}`, {
    withCredentials: true,
  });

  if (handler) {
    socket.on('connect', handler.connectHandler);
    socket.on('disconnect', handler.disconnectHandler);
    socket.on('eventsToClient', handler.eventsToClientHandler);
  }

  return socket;
}

export function useHandleSocket() {
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const { nickname, avatar } = useRecoilValue(userState);
  const { connectHandler, disconnectHandler, eventsToClientHandler } = useSetSocketHandler();

  useEffect(() => {
    if (newMessage.length === 0) return;
    if (sockets.chatSocket === null) return;

    sockets.chatSocket.emit('eventsToServer', {
      nickname,
      avatar,
      message: newMessage,
      timestamp: new Date().toString(),
    });

    setNewMessage('');
  }, [newMessage, setNewMessage, nickname, avatar]);

  useEffect(() => {
    if (!sockets.chatSocket) {
      sockets.chatSocket = createSocket('events', {
        connectHandler,
        disconnectHandler,
        eventsToClientHandler,
      });
    }
  }, []);
}
