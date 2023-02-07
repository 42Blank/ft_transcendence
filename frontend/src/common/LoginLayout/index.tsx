import { Outlet } from 'react-router-dom';

export const LoginLayout = () => {
  return (
    <>
      <header>
        <span>트센</span>
      </header>
      <Outlet />
      <footer>
        <span>ft_transcendence</span>
      </footer>
    </>
  );
};
