import { useTwoFactorLogin } from 'hooks';

import { loginCallbackSpanStyle } from './LoginCallbackPage.styles';

export const Login2FAPage = () => {
  useTwoFactorLogin();

  return <span className={loginCallbackSpanStyle}>이메일에서 2차 인증을 이어서 진행해주세요</span>;
};
