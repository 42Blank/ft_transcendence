import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useGetCurrentChatRoom, useGetCurrentUser } from 'hooks';
import { Modal } from 'common';
import { HamburgerIcon, LockIcon } from 'assets';
import { checkIsUserOperator } from 'utils';
import { currentChatDataState, leaveChatRoomState } from 'store';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';
import { ChatInfoModalHeader, ChatInfoModalBody } from './ChatModal';

import {
  chatPageListWrapperStyle,
  chatPageMenuButtonStyle,
  chatPageModalStyle,
  chatPageTitleLeftSectionStyle,
  chatPageTitleStyle,
  chatPageWrapperStyle,
  closeButtonStyle,
} from './ChatPage.styles';

export const ChatPage = () => {
  const {
    data: { id: currentUserID },
  } = useGetCurrentUser();
  const currentChatData = useRecoilValue(currentChatDataState);
  const resetCurrentChatData = useResetRecoilState(currentChatDataState);
  const currentChatRoom = useGetCurrentChatRoom();
  const setLeaveChatRoom = useSetRecoilState(leaveChatRoomState);
  const [isModalShown, setIsModalShown] = useState(false);
  const isOperator = checkIsUserOperator(currentChatRoom.users, currentUserID);

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
  }

  useEffect(() => {
    return () => {
      setLeaveChatRoom({ id: currentChatRoom.id });
      resetCurrentChatData();
    };
  }, []);

  return (
    <>
      <main className={chatPageWrapperStyle}>
        <header className={chatPageTitleStyle}>
          <div className={chatPageTitleLeftSectionStyle}>
            {currentChatRoom.isPrivate && <LockIcon />}
            <span>{currentChatRoom.roomTitle ?? ''}</span>
          </div>
          <button type="button" onClick={handleOpenModal} className={chatPageMenuButtonStyle}>
            <HamburgerIcon />
          </button>
        </header>
        <ul className={chatPageListWrapperStyle}>
          {currentChatData.map(({ chatUser, message, timestamp }, index) => (
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
          <ChatInfoModalHeader currentChatRoom={currentChatRoom} isCurrentUserOperator={isOperator} />
          <ChatInfoModalBody users={currentChatRoom.users} isCurrentUserOperator={isOperator} />
          <button type="button" onClick={handleCloseModal} className={closeButtonStyle}>
            닫기
          </button>
        </Modal>
      )}
    </>
  );
};
