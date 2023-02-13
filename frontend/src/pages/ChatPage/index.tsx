import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useGetCurrentChatRoom, useGetCurrentUser } from 'hooks';
import { Modal } from 'common';
import { HamburgerIcon } from 'assets';
import { checkIsUserOperator } from 'utils';
import { currentChatDataState, leaveChatRoomState } from 'store';
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
  const {
    data: { id: currentUserID },
  } = useGetCurrentUser();
  const currentChatData = useRecoilValue(currentChatDataState);
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
    };
  }, []);

  return (
    <>
      <main className={chatPageWrapperStyle}>
        <header className={chatPageTitleStyle}>
          <span>{currentChatRoom.roomTitle ?? ''}</span>
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
          <ChatInfoModalHeader
            roomTitle={currentChatRoom.roomTitle}
            isCurrentUserOperator={isOperator}
            isPrivate={currentChatRoom.isPrivate}
          />
          <ChatInfoModalBody users={currentChatRoom.users} isCurrentUserOperator={isOperator} />
          <button type="button" onClick={handleCloseModal} className={closeButtonStyle}>
            닫기
          </button>
        </Modal>
      )}
    </>
  );
};
