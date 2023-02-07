import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { userState } from 'store';
import { ROUTE } from 'common/constants';
import { deleteAuthSignout } from 'services';
import { userMenuInnerStyle, userMenuWrapperStyle } from './UserMenu.styles';

export const UserMenu = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const userInfo = useRecoilValue(userState);
  const resetUserInfo = useResetRecoilState(userState);
  const nav = useNavigate();

  function handleMouseOver() {
    setIsMenuShown(true);
  }

  function handleMouseOut() {
    setIsMenuShown(false);
  }

  function handleClickProfileButton() {
    nav(ROUTE.PROFILE);
  }

  function handleClickLogoutButton() {
    deleteAuthSignout().then(() => {
      resetUserInfo();
      nav(ROUTE.CHAT);
    });
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
      className={userMenuWrapperStyle}
    >
      <span>{userInfo.nickname}</span>
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
