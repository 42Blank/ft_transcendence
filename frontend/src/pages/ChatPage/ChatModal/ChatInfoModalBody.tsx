import { useState } from 'react';

import { Button } from 'common';
import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';
import { UserInfoType } from 'types/user';
import { BannedUserListElement } from './BannedUserListElement';
import { ChatUserListElement } from './ChatUserListElement';

import {
  chatInfoModalBodyButtonStyle,
  chatInfoModalBodyButtonWrapperStyle,
  chatInfoModalBodyStyle,
} from './ChatInfoModalBody.styles';

interface Props {
  users: ChatUserInfoType[];
  bannedUsers: UserInfoType[];
  currentUserRole: ChatUserRoleType;
}

export const ChatInfoModalBody = ({ users, bannedUsers, currentUserRole }: Props) => {
  const [isBanListShown, setIsBanListShown] = useState(false);

  function handleClickUserListButton() {
    setIsBanListShown(false);
  }

  function handleClickBanListButton() {
    setIsBanListShown(true);
  }

  return (
    <>
      <div className={chatInfoModalBodyButtonWrapperStyle}>
        <Button className={chatInfoModalBodyButtonStyle(!isBanListShown)} onClick={handleClickUserListButton}>
          <span>유저 목록</span>
        </Button>
        <Button className={chatInfoModalBodyButtonStyle(isBanListShown)} onClick={handleClickBanListButton}>
          <span>차단 목록</span>
        </Button>
      </div>
      <ul className={chatInfoModalBodyStyle}>
        {isBanListShown
          ? bannedUsers.map((user, index) => (
              <BannedUserListElement key={`ban-user-list-${index}`} user={user} currentUserRole={currentUserRole} />
            ))
          : users.map((user, index) => (
              <ChatUserListElement key={`chat-user-list-${index}`} chatUser={user} currentUserRole={currentUserRole} />
            ))}
      </ul>
    </>
  );
};
