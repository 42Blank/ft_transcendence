import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getFtCallbackCode, getLogin } from 'services';
import { FtProfileType } from 'types/user';

export function useLogin() {
  const [param] = useSearchParams();
  const nav = useNavigate();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  useQuery(['ft-auth'], () => getFtCallbackCode(param.get('code')), {
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
      // 로그인 실패
    },
  });

  useQuery(['user-me'], getLogin, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12, // TODO: 적절한 시간으로 수정
    retry: 0,
    enabled: isRegistered,
    useErrorBoundary: false,
    onSuccess: () => {
      nav(ROUTE.CHAT); // 일단해봄
    },
    onError: () => {
      // 로그인 실패
    },
  });
}
