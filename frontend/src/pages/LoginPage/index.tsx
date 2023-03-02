import { FtLogoIcon } from 'assets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { API, ROUTE } from 'common/constants';
import { useGetUser } from 'hooks';
import { loginLinkStyle } from './LoginPage.styles';

export const LoginPage = () => {
  const {
    data: { id },
  } = useGetUser();
  const nav = useNavigate();

  useEffect(() => {
    if (id >= 0) nav(ROUTE.CHAT);
  }, [id]);

  return (
    <a href={process.env.REACT_APP_SERVER + API.FT_AUTH} className={loginLinkStyle}>
      <span>Login with</span>
      <FtLogoIcon />
      <span>OAuth</span>
    </a>
  );
};
