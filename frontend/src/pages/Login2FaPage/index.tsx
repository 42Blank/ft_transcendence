import { useTwoFactorLogin } from '../../hooks';

export const Login2FaPage = () => {
  useTwoFactorLogin();

  return (
    <main>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} />
      <span>이메일에서 2차 인증을 이어서 진행해주세요</span>
    </main>
  );
};
