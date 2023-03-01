import { useState } from 'react';

import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';
import { UserInfoType } from 'types/user';
import { ChatUserListElement } from './ChatUserListElement';

import {
  chatInfoModalBodyButtonStyle,
  chatInfoModalBodyButtonWrapperStyle,
  chatInfoModalBodyStyle,
} from './ChatInfoModalBody.styles';
import { BannedUserListElement } from './BannedUserListElement';

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
        <button
          type="button"
          className={chatInfoModalBodyButtonStyle(!isBanListShown)}
          onClick={handleClickUserListButton}
        >
          <span>유저 목록</span>
        </button>
        <button
          type="button"
          className={chatInfoModalBodyButtonStyle(isBanListShown)}
          onClick={handleClickBanListButton}
        >
          <span>차단 목록</span>
        </button>
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
