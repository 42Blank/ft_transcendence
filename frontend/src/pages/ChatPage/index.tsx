import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { HamburgerIcon, LockIcon } from 'assets';
import { Modal } from 'common';
import { useGetBlockList, useGetCurrentChatRoom, useGetUser } from 'hooks';
import { currentChatDataState, leaveChatRoomState } from 'store';
import { checkUserRole } from 'utils';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';
import { ChatInfoModalBody, ChatInfoModalHeader } from './ChatModal';

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
    data: { id },
  } = useGetUser();
  const currentChatData = useRecoilValue(currentChatDataState);
  const resetCurrentChatData = useResetRecoilState(currentChatDataState);
  const currentChatRoom = useGetCurrentChatRoom();
  const setLeaveChatRoom = useSetRecoilState(leaveChatRoomState);
  const [isModalShown, setIsModalShown] = useState(false);
  const currentUserRole = checkUserRole(currentChatRoom.users, id);
  const { blockList } = useGetBlockList();

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
          {currentChatData
            .filter(({ chatUser }) => blockList.every(({ id: blockUserId }) => blockUserId !== chatUser.user.id))
            .map(({ chatUser, message, timestamp }, index) => (
              <ChatElement
                key={`${index}-${chatUser.user.nickname}`}
                chatUser={chatUser}
                message={message}
                timestamp={timestamp}
                isMine={id === chatUser.user.id}
              />
            ))}
        </ul>
        <ChatInput />
      </main>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal} className={chatPageModalStyle}>
          <ChatInfoModalHeader currentChatRoom={currentChatRoom} currentUserRole={currentUserRole} />
          <ChatInfoModalBody
            users={currentChatRoom.users}
            bannedUsers={currentChatRoom.bannedUsers}
            currentUserRole={currentUserRole}
          />
          <button type="button" onClick={handleCloseModal} className={closeButtonStyle}>
            닫기
          </button>
        </Modal>
      )}
    </>
  );
};
