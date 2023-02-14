import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { useHandleSocket } from 'hooks';
import { NavBar } from './NavBar';
import { FriendsList } from './FriendsList';

import { mainLayoutStyle } from './MainLayout.styles';

export const MainLayout = () => {
  useHandleSocket(); // TODO: 레이아웃 컴포넌트에서 의존성 줄이기?
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (pathname === ROUTE.ROOT) nav(ROUTE.CHAT);
  }, [pathname, nav]);

  return (
    <>
      <NavBar setIsSidebarOpen={setIsSidebarOpen} />
      <div className={mainLayoutStyle}>
        <FriendsList isOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </>
  );
};
