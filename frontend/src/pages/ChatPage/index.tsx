import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useGetCurrentUser } from 'hooks';
import { Modal } from 'common';
import { HamburgerIcon } from 'assets';
import { currentChatDataState } from 'store';
import { checkIsUserOperator } from 'utils';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';

import {
  chatPageListWrapperStyle,
  chatPageMenuButtonStyle,
  chatPageTitleStyle,
  chatPageWrapperStyle,
  closeButtonStyle,
} from './ChatPage.styles';
import { ChatInfoModalHeader } from './ChatInfoModalHeader';
import { ChatInfoModalBody } from './ChatInfoModalBody';

const DUMMY_CHAT_INFO = {
  roomTitle: 'ycha 바보',
  isPrivate: true,
  users: [
    {
      id: 1,
      nickname: '자송 the 엄청긴닉네임소유자',
      intraId: '11111',
      avatar: 'https://cdn.intra.42.fr/users/b3af07505013b8500276523f65b49ff1/jasong.JPG',
      point: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      isOperator: true,
    },
    {
      id: 5,
      nickname: '지최',
      intraId: '55555',
      avatar: 'https://cdn.intra.42.fr/users/b9c44cf9ae13ffec04381638c0a2f204/jiychoi.jpg',
      point: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      isOperator: true,
    },
    {
      id: 4,
      nickname: '영차',
      intraId: '44444',
      avatar: 'https://cdn.intra.42.fr/users/6038c103da3bb9180a072f8154e6b428/ycha.jpg',
      point: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      isOperator: false,
    },
  ],
}; // TODO: 더미데이터 날리기

export const ChatPage = () => {
  // const { id } = useParams();
  const { id: currentUserID } = useGetCurrentUser();
  const currentChatData = useRecoilValue(currentChatDataState);
  const [isShown, setIsShown] = useState(false);
  const isOperator = checkIsUserOperator(DUMMY_CHAT_INFO.users, currentUserID);

  function handleOpenModal() {
    setIsShown(true);
  }

  function handleCloseModal() {
    setIsShown(false);
  }

  return (
    <>
      <main className={chatPageWrapperStyle}>
        <header className={chatPageTitleStyle}>
          <span>{DUMMY_CHAT_INFO.roomTitle}</span>
          <button type="button" onClick={handleOpenModal} className={chatPageMenuButtonStyle}>
            <HamburgerIcon /> {/* TODO: 더 잘 어울리는 아이콘 있으면 그걸로 바꿀 예정 */}
          </button>
        </header>
        <ul className={chatPageListWrapperStyle}>
          {currentChatData.map(({ user, message, timestamp }, index) => (
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
      {isShown && (
        <Modal handleCloseModal={handleCloseModal}>
          <ChatInfoModalHeader
            roomTitle={DUMMY_CHAT_INFO.roomTitle}
            isOperator={isOperator}
            isPrivate={DUMMY_CHAT_INFO.isPrivate}
          />
          <ChatInfoModalBody users={DUMMY_CHAT_INFO.users} isOperator={isOperator} />
          <button type="button" onClick={handleCloseModal} className={closeButtonStyle}>
            닫기
          </button>
        </Modal>
      )}
    </>
  );
};
