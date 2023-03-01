import { useTwoFactorLoginCallback } from 'hooks';

import { loginCallbackSpanStyle } from './LoginCallbackPage.styles';

export const Login2FACallbackPage = () => {
  useTwoFactorLoginCallback();

  return <span className={loginCallbackSpanStyle}>2차 인증을 진행 중입니다...</span>;
};
