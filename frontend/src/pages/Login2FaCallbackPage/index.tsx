import { useTwoFactorLoginCallback } from 'hooks';

export const Login2FaCallbackPage = () => {
  useTwoFactorLoginCallback();

  return (
    <main>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} />
      <span>Proceeding Two-Factor Authentication...</span>
    </main>
  );
};
