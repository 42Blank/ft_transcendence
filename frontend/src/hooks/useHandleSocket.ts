import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';

import { currentChatDataState, newMessageState, userState } from 'store';

const socket = io(process.env.REACT_APP_SOCKET_URL as string);

export function useHandleSocket() {
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const { nickname, avatar } = useRecoilValue(userState);
  const setCurrentChatData = useSetRecoilState(currentChatDataState);

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
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('exception', data => {
      console.log('event', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    socket.on('eventsToClient', data => {
      console.log('event: ', data);

      setCurrentChatData(prev => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}
