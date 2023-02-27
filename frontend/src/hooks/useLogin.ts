import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getFtCallbackCode, getLogin } from 'services';
import { FtProfileType } from 'types/user';
import { ApiError } from '../utils/error';

export function useLogin() {
  const [param] = useSearchParams();
  const nav = useNavigate();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  useQuery(['ft-auth'], () => getFtCallbackCode(param), {
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
    retry: 0,
    useErrorBoundary: false,
    onSuccess: (data: FtProfileType) => {
      if (!data.isRegistered) nav(ROUTE.REGISTER);
      setIsRegistered(true);
    },
    onError: () => {
      nav(ROUTE.LOGIN);
    },
  });

  useQuery(['user-me'], getLogin, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60, // TODO: 적절한 시간으로 수정
    retry: 0,
    enabled: isRegistered,
    useErrorBoundary: false,
    onSuccess: () => {
      nav(ROUTE.CHAT);
    },
    onError: (err: unknown) => {
      if (err instanceof ApiError) {
        if (err.statusCode === 401 && err.message.includes('2FA')) {
          nav(ROUTE.LOGIN_2FA);
          return;
        }
      }
      nav(ROUTE.LOGIN);
    },
  });
}
