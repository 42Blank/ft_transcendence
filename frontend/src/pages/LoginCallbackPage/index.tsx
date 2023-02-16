import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getFtCallbackCode } from 'services';
import { loginCallbackLogoImageStyle, loginCallbackWrapperStyle } from './LoginCallbackPage.styles';

export const LoginCallbackPage = () => {
  const [param] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const code = param.get('code');
    if (!code) {
      nav(ROUTE.LOGIN);
      return;
    }
    getFtCallbackCode(code).then(() => {
      nav(ROUTE.CHAT);
    });
  }, [param, nav]);

  return (
    <main className={loginCallbackWrapperStyle}>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} className={loginCallbackLogoImageStyle} />
      <span>로그인 중...</span>
    </main>
  );
};
