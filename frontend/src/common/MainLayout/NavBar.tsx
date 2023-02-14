import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { HamburgerIcon } from 'assets';
import { UserMenu } from './UserMenu';

import {
  headerHamburgerButtonStyle,
  headerIconButtonStyle,
  headerLeftSectionStyle,
  headerMainButtonStyle,
  headerStyle,
} from './NavBar.styles';

interface Props {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavBar = ({ setIsSidebarOpen }: Props) => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  function handleClickSidebarButton() {
    setIsSidebarOpen(prevState => !prevState);
  }
  function handleClickMainPageButton() {
    nav(ROUTE.CHAT);
  }
  function handleClickGamePageButton() {
    nav(ROUTE.GAME);
  }

  return (
    <header className={headerStyle}>
      <div className={headerLeftSectionStyle}>
        <button type="button" onClick={handleClickSidebarButton} className={headerHamburgerButtonStyle}>
          <HamburgerIcon />
        </button>
        <button type="button" onClick={handleClickMainPageButton} className={headerIconButtonStyle}>
          <img src="/icon.png" alt="title pochita icon" height={40} />
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
