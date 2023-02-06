import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';

export const LoginCallbackPage = () => {
  const [param] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const code = param.get('code');
    if (!code) nav(ROUTE.LOGIN);
  }, [param]);

  return (
    <div>
      <span>로그인 중...</span>
    </div>
  );
};
