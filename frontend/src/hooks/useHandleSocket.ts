import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';

import { newMessageState, userState } from 'store';
import { useSetSocketHandler } from './useSetSocketHandler';

const socket = io(process.env.REACT_APP_SOCKET_URL as string);

export function useHandleSocket() {
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const { nickname, avatar } = useRecoilValue(userState);
  const { connectHandler, disconnectHandler, eventsToClientHandler } = useSetSocketHandler();

  useEffect(() => {
    if (newMessage.length === 0) return;

    socket.emit('eventsToServer', {
      nickname,
      avatar,
      message: newMessage,
      timestamp: new Date().toString(),
    });
    setNewMessage('');
  }, [newMessage, setNewMessage, nickname, avatar]);

  useEffect(() => {
    socket.on('connect', connectHandler);

    socket.on('disconnect', disconnectHandler);

    socket.on('eventsToClient', eventsToClientHandler);

    return () => {
      socket.off('connect', connectHandler);
      socket.off('disconnect', disconnectHandler);
      socket.off('eventsToClient', eventsToClientHandler);
      socket.disconnect();
    };
  }, []);
}
