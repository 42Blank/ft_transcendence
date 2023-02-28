import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getAuth2Fa } from '../services';

export function useTwoFactorLogin() {
  const nav = useNavigate();
  useQuery(['2fa-auth'], () => getAuth2Fa(), {
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
    retry: 0,
    useErrorBoundary: false,
    onSuccess: async () => {},
    onError: () => {
      nav(ROUTE.LOGIN);
    },
  });
}
