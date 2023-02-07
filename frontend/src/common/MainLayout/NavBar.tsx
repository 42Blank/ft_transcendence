import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { userState } from 'store';
import { headerMainButtonStyle, headerStyle } from './NavBar.styles';

export const NavBar = () => {
  const userInfo = useRecoilValue(userState);
  const nav = useNavigate();

  function handleClickLoginButton() {
    nav(ROUTE.LOGIN);
  }

  function handleClickMainPageButton() {
    nav(ROUTE.CHAT);
  }

  return (
    <header className={headerStyle}>
      <img src="/icon.png" alt="title pochita icon" />
      <button type="button" onClick={handleClickMainPageButton} className={headerMainButtonStyle}>
        <span>트센 트센</span>
      </button>
      {userInfo.id >= 0 ? (
        <div>
          <span>{userInfo.nickname}</span>
        </div>
      ) : (
        <button type="button" onClick={handleClickLoginButton}>
          <span>로그인</span>
        </button>
      )}
    </header>
  );
};
