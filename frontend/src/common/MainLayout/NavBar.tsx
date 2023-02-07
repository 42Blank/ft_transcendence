import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { headerIconButtonStyle, headerLeftSectionStyle, headerMainButtonStyle, headerStyle } from './NavBar.styles';
import { UserMenu } from './UserMenu';

export const NavBar = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  function handleClickMainPageButton() {
    nav(ROUTE.CHAT);
  }
  function handleClickGamePageButton() {
    nav(ROUTE.GAME);
  }

  return (
    <header className={headerStyle}>
      <div className={headerLeftSectionStyle}>
        <button type="button" onClick={handleClickMainPageButton} className={headerIconButtonStyle}>
          <img src="/icon.png" alt="title pochita icon" />
          <h1>Pochitandence</h1>
        </button>
        <button
          type="button"
          onClick={handleClickMainPageButton}
          className={headerMainButtonStyle(pathname.startsWith(ROUTE.CHAT))}
        >
          <span>채팅</span>
        </button>
        <button
          type="button"
          onClick={handleClickGamePageButton}
          className={headerMainButtonStyle(pathname.startsWith(ROUTE.GAME))}
        >
          <span>게임</span>
        </button>
      </div>
      <UserMenu />
    </header>
  );
};
