import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import { userState } from 'store';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';

import { chatPageListWrapperStyle, chatPageTitleStyle, chatPageWrapperStyle } from './ChatPage.styles';

const DUMMY_CHAT = [
  {
    nickname: 'ycha',
    avatar: 'https://cdn.intra.42.fr/users/6038c103da3bb9180a072f8154e6b428/ycha.jpg',
    message: '이방 뭐임',
    timestamp: '1970-01-01T00:00:00.000Z',
  },
  {
    nickname: 'jiychoi',
    avatar: 'https://cdn.intra.42.fr/users/b9c44cf9ae13ffec04381638c0a2f204/jiychoi.jpg',
    message: 'ㅋㅋ',
    timestamp: '1970-01-01T00:01:00.000Z',
  },
  {
    nickname: 'asdasdadasdasdads',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    nickname: 'san',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    nickname: 'san',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    nickname: 'san',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    nickname: 'san',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    nickname: 'san',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    nickname: 'san',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    nickname: 'san',
    avatar: 'https://san.chosun.com/news/photo/202205/15750_66157_37.jpg',
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
];

export const ChatPage = () => {
  const { id } = useParams();
  const userInfo = useRecoilValue(userState);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <main className={chatPageWrapperStyle}>
      <header className={chatPageTitleStyle}>
        <span>ycha 바보</span>
        <button type="button">V</button> {/* TODO: svg로 변경 */}
      </header>
      <ul className={chatPageListWrapperStyle}>
        {DUMMY_CHAT.map(({ nickname, avatar, message, timestamp }, index) => (
          <ChatElement
            key={`${index}-${nickname}`}
            nickname={nickname}
            avatar={avatar}
            message={message}
            timestamp={timestamp}
            isMine={userInfo.nickname === nickname}
          />
        ))}
      </ul>
      <ChatInput />
    </main>
  );
};
