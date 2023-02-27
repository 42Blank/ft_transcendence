import { FtLogoIcon } from 'assets';
import { API } from 'common/constants';

import { loginLinkStyle } from './LoginPage.styles';

export const LoginPage = () => {
  return (
    <a href={process.env.REACT_APP_SERVER + API.FT_AUTH} className={loginLinkStyle}>
      <span>Login with</span>
      <FtLogoIcon />
      <span>OAuth</span>
    </a>
  );
};
