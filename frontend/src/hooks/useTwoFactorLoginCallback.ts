import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getAuth2FaCallBack } from '../services';

export function useTwoFactorLoginCallback() {
  const [param] = useSearchParams();
  const code = param.get('code');
  const nav = useNavigate();
  useQuery(['2fa-auth-callback'], () => getAuth2FaCallBack(code), {
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
    retry: 0,
    useErrorBoundary: false,
    onSuccess: async () => {
      nav(ROUTE.CHAT);
    },
    onError: () => {
      nav(ROUTE.LOGIN);
    },
  });
}
