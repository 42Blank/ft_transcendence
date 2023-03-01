import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ArrowDownIcon, CrownIcon } from 'assets';
import { Button } from 'common';
import { ROUTE } from 'common/constants';
import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';
import { COMMON_SIZES } from 'styles';
import { ChatUserOperationBox } from './ChatUserOperationBox';

import {
  chatUserDrawerButtonStyle,
  chatUserDrawerStyle,
  chatUserElementImageStyle,
  chatUserElementWrapperStyle,
  chatUserLinkWrapperStyle,
  chatUserNicknameSpanStyle,
} from './ChatUserListElement.styles';

interface Props {
  chatUser: ChatUserInfoType;
  currentUserRole: ChatUserRoleType;
}

export const ChatUserListElement = ({ chatUser, currentUserRole }: Props) => {
  const { user, role } = chatUser;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  function handleClickToggleDrawer() {
    setIsDrawerOpen(prevState => !prevState);
  }

  return (
    <>
      <li className={chatUserElementWrapperStyle}>
        <Link to={`${ROUTE.PROFILE}/${user.id}`} className={chatUserLinkWrapperStyle(role)}>
          <img
            src={user.avatar}
            alt={`${user.nickname}-avatar`}
            width={COMMON_SIZES.ICON_XLARGE}
            height={COMMON_SIZES.ICON_XLARGE}
            className={chatUserElementImageStyle}
          />
          {role !== 'user' && <CrownIcon />}
          <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
        </Link>
        <Button onClick={handleClickToggleDrawer} className={chatUserDrawerButtonStyle(isDrawerOpen)}>
          <ArrowDownIcon />
        </Button>
      </li>
      <div className={chatUserDrawerStyle(isDrawerOpen)}>
        <ChatUserOperationBox chatUser={chatUser} currentUserRole={currentUserRole} />
      </div>
    </>
  );
};
