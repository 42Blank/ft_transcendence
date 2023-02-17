import { FtLogoIcon } from 'assets';
import { API } from 'common/constants';

import { loginLinkStyle, loginPageLogoImageStyle, loginPageWrapperStyle } from './LoginPage.styles';

export const LoginPage = () => {
  return (
    <main className={loginPageWrapperStyle}>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} className={loginPageLogoImageStyle} />
      <a href={process.env.REACT_APP_SERVER + API.FT_AUTH} className={loginLinkStyle}>
        <span>Login with</span>
        <FtLogoIcon />
        <span>OAuth</span>
      </a>
    </main>
  );
};
