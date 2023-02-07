import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { NavBar } from './NavBar';

export const MainLayout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (pathname === '/') nav('/chat');
  }, [pathname, nav]);

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
