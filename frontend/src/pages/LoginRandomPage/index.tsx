import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getFtCallbackCode } from 'services/getLoginRandom';

export const LoginRandomPage = () => {
  const nav = useNavigate();

  useEffect(() => {
    getFtCallbackCode().then(() => {
      nav(ROUTE.REGISTER);
    });
  }, []);

  return (
    <main>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} />
      <span>랜덤 로그인 중...</span>
    </main>
  );
};
