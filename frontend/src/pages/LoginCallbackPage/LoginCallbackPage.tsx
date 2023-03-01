import { useLogin } from 'hooks';

import { loginCallbackSpanStyle } from './LoginCallbackPage.styles';

export const LoginCallbackPage = () => {
  useLogin();

  return <span className={loginCallbackSpanStyle}>로그인 중...</span>;
};
