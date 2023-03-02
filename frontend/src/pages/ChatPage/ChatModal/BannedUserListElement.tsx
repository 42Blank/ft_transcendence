import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ArrowDownIcon } from 'assets';
import { Avatar, Button } from 'common';
import { ROUTE } from 'common/constants';
import { ChatUserRoleType } from 'types/chat';
import { UserInfoType } from 'types/user';
import { COMMON_SIZES } from 'styles';
import { BanUserOperationBox } from './BanUserOperationBox';

import {
  chatUserDrawerButtonStyle,
  chatUserDrawerStyle,
  chatUserElementImageStyle,
  chatUserElementWrapperStyle,
  chatUserLinkWrapperStyle,
  chatUserNicknameSpanStyle,
} from './ChatUserListElement.styles';

interface Props {
  user: UserInfoType;
  currentUserRole: ChatUserRoleType;
}

export const BannedUserListElement = ({ user, currentUserRole }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  function handleClickToggleDrawer() {
    setIsDrawerOpen(prevState => !prevState);
  }

  function handleClickCloseDrawer() {
    setIsDrawerOpen(false);
  }

  return (
    <>
      <li className={chatUserElementWrapperStyle}>
        <Link to={`${ROUTE.PROFILE}/${user.id}`} className={chatUserLinkWrapperStyle('user')}>
          <Avatar
            userAvatar={user.avatar}
            alt={`${user.nickname}-avatar`}
            size={COMMON_SIZES.ICON_XLARGE}
            className={chatUserElementImageStyle}
          />
          <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
        </Link>
        {currentUserRole !== 'user' && (
          <Button onClick={handleClickToggleDrawer} className={chatUserDrawerButtonStyle(isDrawerOpen)}>
            <ArrowDownIcon />
          </Button>
        )}
      </li>
      <div className={chatUserDrawerStyle(isDrawerOpen)}>
        <BanUserOperationBox banUser={user} currentUserRole={currentUserRole} onClickClose={handleClickCloseDrawer} />
      </div>
    </>
  );
};
