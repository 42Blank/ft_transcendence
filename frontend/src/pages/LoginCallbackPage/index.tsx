import { useLogin } from 'hooks';

import { loginCallbackWrapperStyle } from './LoginCallbackPage.styles';

export const LoginCallbackPage = () => {
  useLogin();

  return (
    <div className={loginCallbackWrapperStyle}>
      <span>로그인 중...</span>
    </div>
  );
};
