import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button } from 'common';
import { ROUTE } from 'common/constants';
import { useGetUser, useLogout } from 'hooks';

import { userMenuHoverButton, userMenuInnerStyle, userMenuNameStyle, userMenuWrapperStyle } from './UserMenu.styles';

export const UserMenu = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const { data: currentUser } = useGetUser();
  const nav = useNavigate();
  const logout = useLogout();

  function handleMouseOver() {
    setIsMenuShown(true);
  }

  function handleMouseOut() {
    setIsMenuShown(false);
  }

  function handleClickProfileButton() {
    nav(ROUTE.PROFILE);
  }

  async function handleClickLogoutButton() {
    await logout();
    nav(ROUTE.LOGIN);
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
      className={userMenuWrapperStyle}
    >
      <Avatar userAvatar={currentUser.avatar} alt="nav-bar-profile" />
      <span className={userMenuNameStyle}>{currentUser.nickname}</span>
      <div className={userMenuInnerStyle(isMenuShown)}>
        <Button onClick={handleClickProfileButton} className={userMenuHoverButton}>
          <span>내 프로필</span>
        </Button>
        <Button onClick={handleClickLogoutButton} className={userMenuHoverButton}>
          <span>로그아웃</span>
        </Button>
      </div>
    </div>
  );
};
