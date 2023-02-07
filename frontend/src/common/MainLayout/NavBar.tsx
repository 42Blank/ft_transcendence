import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { headerMainButtonStyle, headerStyle } from './NavBar.styles';
import { UserMenu } from './UserMenu';

export const NavBar = () => {
  const nav = useNavigate();

  function handleClickMainPageButton() {
    nav(ROUTE.CHAT);
  }

  return (
    <header className={headerStyle}>
      <img src="/icon.png" alt="title pochita icon" />
      <button type="button" onClick={handleClickMainPageButton} className={headerMainButtonStyle}>
        <span>트센 트센</span>
      </button>
      <UserMenu />
    </header>
  );
};
