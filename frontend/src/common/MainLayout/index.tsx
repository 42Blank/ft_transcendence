import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar } from './NavBar';
import { FriendsList } from './FriendsList';

import { mainLayoutStyle } from './MainLayout.styles';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
