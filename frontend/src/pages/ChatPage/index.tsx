import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useGetCurrentUser } from 'hooks';
import { Modal } from 'common';
import { HamburgerIcon } from 'assets';
import { currentChatDataState } from 'store';
import { checkIsUserOperator } from 'utils';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';
import { ChatInfoModalHeader, ChatInfoModalBody } from './ChatModal';

import {
  chatPageListWrapperStyle,
  chatPageMenuButtonStyle,
  chatPageModalStyle,
  chatPageTitleStyle,
  chatPageWrapperStyle,
  closeButtonStyle,
} from './ChatPage.styles';

export const ChatPage = () => {
  const { state } = useLocation();
  const { id: currentUserID } = useGetCurrentUser();
  const nav = useNavigate();
  const currentChatData = useRecoilValue(currentChatDataState);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isCurrentUserOperator, setIsCurrentUserOperator] = useState(false);

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
  }

  useEffect(() => {
    if (!state) {
      alert('채팅방이 존재하지 않습니다!');
      nav(-1);
    }
    setIsCurrentUserOperator(checkIsUserOperator(state.users, currentUserID));
  }, [state]);

  return (
    <>
      <main className={chatPageWrapperStyle}>
        <header className={chatPageTitleStyle}>
          <span>{state?.roomTitle ?? ''}</span>
          <button type="button" onClick={handleOpenModal} className={chatPageMenuButtonStyle}>
            <HamburgerIcon />
          </button>
        </header>
        <ul className={chatPageListWrapperStyle}>
          {currentChatData.map(({ user: chatUser, message, timestamp }, index) => (
            <ChatElement
              key={`${index}-${chatUser.user.nickname}`}
              chatUser={chatUser}
              message={message}
              timestamp={timestamp}
              isMine={currentUserID === chatUser.user.id}
            />
          ))}
        </ul>
        <ChatInput />
      </main>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal} className={chatPageModalStyle}>
          <ChatInfoModalHeader
            roomTitle={state.roomTitle}
            isCurrentUserOperator={isCurrentUserOperator}
            isPrivate={state.isPrivate}
          />
          <ChatInfoModalBody users={state.users} isCurrentUserOperator={isCurrentUserOperator} />
          <button type="button" onClick={handleCloseModal} className={closeButtonStyle}>
            닫기
          </button>
        </Modal>
      )}
    </>
  );
};
