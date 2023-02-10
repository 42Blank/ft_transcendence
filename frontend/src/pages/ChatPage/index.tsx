import { HamburgerIcon } from 'assets';
import { useRecoilValue } from 'recoil';
// import { useParams } from 'react-router-dom';

import { currentUserState } from 'store';
import { ChatDataType } from 'types/chat';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';

import { chatPageListWrapperStyle, chatPageTitleStyle, chatPageWrapperStyle } from './ChatPage.styles';

const DUMMY_CHAT: ChatDataType[] = [
  {
    user: {
      id: 1,
      nickname: '자송 the 엄청긴닉네임소유자',
      intraId: '11111',
      avatar: 'https://cdn.intra.42.fr/users/b3af07505013b8500276523f65b49ff1/jasong.JPG',
      point: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      isOperator: false,
    },
    message: '이방 뭐임',
    timestamp: '1970-01-01T00:00:00.000Z',
  },
  {
    user: {
      id: 4,
      nickname: '영차',
      intraId: '44444',
      avatar: 'https://cdn.intra.42.fr/users/6038c103da3bb9180a072f8154e6b428/ycha.jpg',
      point: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      isOperator: false,
    },
    message: 'ㅋㅋ',
    timestamp: '1970-01-01T00:01:00.000Z',
  },
  {
    user: {
      id: 5,
      nickname: '지최',
      intraId: '55555',
      avatar: 'https://cdn.intra.42.fr/users/b9c44cf9ae13ffec04381638c0a2f204/jiychoi.jpg',
      point: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      isOperator: true,
    },
    message:
      'ㅋㅎㅋㅎㅋㅎㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅎㅋㅎ엄청긴채팅ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
    timestamp: '1970-01-01T00:02:00.000Z',
  },
  {
    user: {
      id: 4,
      nickname: '영차',
      intraId: '44444',
      avatar: 'https://cdn.intra.42.fr/users/6038c103da3bb9180a072f8154e6b428/ycha.jpg',
      point: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      isOperator: false,
    },
    message: 'ㅋzzzzㅋㅋㅋㅋㅋㅋ',
    timestamp: '1970-01-01T00:01:00.000Z',
  },
];

export const ChatPage = () => {
  // const { id } = useParams();
  const { id: currentUserID } = useRecoilValue(currentUserState);
  // const currentChatData = useRecoilValue(currentChatDataState);

  return (
    <main className={chatPageWrapperStyle}>
      <header className={chatPageTitleStyle}>
        <span>ycha 바보</span>
        <button type="button">
          <HamburgerIcon /> {/* TODO: 더 잘 어울리는 아이콘 있으면 그걸로 바꿀 예정 */}
        </button>
      </header>
      <ul className={chatPageListWrapperStyle}>
        {DUMMY_CHAT.map(({ user, message, timestamp }, index) => (
          <ChatElement
            key={`${index}-${user.nickname}`}
            user={user}
            message={message}
            timestamp={timestamp}
            isMine={currentUserID === user.id}
          />
        ))}
      </ul>
      <ChatInput />
    </main>
  );
};
