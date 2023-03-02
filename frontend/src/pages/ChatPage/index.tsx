import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { CloseIcon, EllipsisIcon, LockIcon } from 'assets';
import { Button, Modal } from 'common';
import { ROUTE } from 'common/constants';
import { useGetBlockList, useGetCurrentChatRoom, useGetUser } from 'hooks';
import { currentChatDataState, inviteGameRoomState, leaveChatRoomState } from 'store';
import { checkUserRole } from 'utils';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';
import { ChatInfoModalBody, ChatInfoModalHeader } from './ChatModal';
import { GameInviteModalBody } from './GameInviteModal';

import {
  chatPageListWrapperStyle,
  chatPageMenuButtonStyle,
  chatPageTitleLeftSectionStyle,
  chatPageTitleStyle,
  chatPageWrapperStyle,
} from './ChatPage.styles';

export const ChatPage = () => {
  const {
    data: { id },
  } = useGetUser();
  const nav = useNavigate();
  const currentChatData = useRecoilValue(currentChatDataState);
  const resetCurrentChatData = useResetRecoilState(currentChatDataState);
  const currentChatRoom = useGetCurrentChatRoom();
  const inviteGameRoom = useRecoilValue(inviteGameRoomState);
  const resetInviteGameRoom = useResetRecoilState(inviteGameRoomState);
  const setLeaveChatRoom = useSetRecoilState(leaveChatRoomState);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isInviteModalShown, setIsInviteModalShown] = useState(false);
  const currentUserRole = checkUserRole(currentChatRoom.users, id);
  const { blockList } = useGetBlockList();

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
  }

  function handleCloseInviteModal() {
    setIsInviteModalShown(false);
    resetInviteGameRoom();
  }

  function onClickExit() {
    setLeaveChatRoom({ id: currentChatRoom.id });
    resetCurrentChatData();
    nav(ROUTE.CHAT);
  }

  useEffect(() => {
    return () => {
      setLeaveChatRoom({ id: currentChatRoom.id });
      resetCurrentChatData();
    };
  }, []);

  useEffect(() => {
    setIsInviteModalShown(!!inviteGameRoom.id);
  }, [inviteGameRoom]);

  return (
    <>
      <main className={chatPageWrapperStyle}>
        <header className={chatPageTitleStyle}>
          <div className={chatPageTitleLeftSectionStyle}>
            {currentChatRoom.isPrivate && <LockIcon />}
            <span>{currentChatRoom.roomTitle ?? ''}</span>
          </div>
          <div>
            <Button onClick={handleOpenModal} className={chatPageMenuButtonStyle}>
              <EllipsisIcon />
            </Button>
            <Button onClick={onClickExit} className={chatPageMenuButtonStyle}>
              <CloseIcon />
            </Button>
          </div>
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
        <Modal onClickClose={handleCloseModal}>
          <ChatInfoModalHeader
            currentChatRoom={currentChatRoom}
            currentUserRole={currentUserRole}
            onClickClose={handleCloseModal}
          />
          <ChatInfoModalBody
            users={currentChatRoom.users}
            bannedUsers={currentChatRoom.bannedUsers}
            currentUserRole={currentUserRole}
          />
        </Modal>
      )}
      {isInviteModalShown && (
        <Modal onClickClose={handleCloseModal}>
          <h3 className={chatPageTitleStyle}>게임 초대</h3>
          <GameInviteModalBody
            onClickClose={handleCloseInviteModal}
            nickname={inviteGameRoom.nickname}
            gameRoomId={inviteGameRoom.id}
          />
        </Modal>
      )}
    </>
  );
};
