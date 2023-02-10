import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { useGetCurrentUser, useLogout } from 'hooks';

import { userMenuInnerStyle, userMenuWrapperStyle } from './UserMenu.styles';

export const UserMenu = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const currentUser = useGetCurrentUser();
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
      <span>{currentUser.nickname}</span>
      <div className={userMenuInnerStyle(isMenuShown)}>
        <button type="button" onClick={handleClickProfileButton}>
          <span>내 프로필</span>
        </button>
        <button type="button" onClick={handleClickLogoutButton}>
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};
