import { useLogin } from 'hooks';
import { loginCallbackLogoImageStyle, loginCallbackWrapperStyle } from './LoginCallbackPage.styles';

export const LoginCallbackPage = () => {
  useLogin();

  return (
    <main className={loginCallbackWrapperStyle}>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} className={loginCallbackLogoImageStyle} />
      <span>로그인 중...</span>
    </main>
  );
};
