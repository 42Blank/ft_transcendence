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

  function handleClickProfile() {
    setIsMenuShown(prevState => !prevState);
  }

  function handleClickProfileButton() {
    nav(ROUTE.PROFILE);
  }

  async function handleClickLogoutButton() {
    await logout();
    nav(ROUTE.LOGIN);
  }

  return (
    <>
      <Button onClick={handleClickProfile} className={userMenuWrapperStyle}>
        <Avatar userAvatar={currentUser.avatar} alt="nav-bar-profile" />
        <span className={userMenuNameStyle}>{currentUser.nickname}</span>
      </Button>
      {isMenuShown && (
        <div className={userMenuInnerStyle}>
          <Button onClick={handleClickProfileButton} className={userMenuHoverButton}>
            <span>내 프로필</span>
          </Button>
          <Button onClick={handleClickLogoutButton} className={userMenuHoverButton}>
            <span>로그아웃</span>
          </Button>
          <Button onClick={handleClickProfile} className={userMenuHoverButton}>
            <span>닫기</span>
          </Button>
        </div>
      )}
    </>
  );
};
