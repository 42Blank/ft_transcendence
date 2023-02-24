import { useGetUser } from 'hooks';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getGithubCallbackCode } from 'services/getGithubCallbackCode';

export function useTwoFactorLogin() {
  const { refetch } = useGetUser();
  const [param] = useSearchParams();
  const nav = useNavigate();
  useQuery(['github-auth'], () => getGithubCallbackCode(param), {
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
    retry: 0,
    useErrorBoundary: false,
    onSuccess: async () => {
      await refetch();
      nav(ROUTE.PROFILE);
    },
    onError: () => {
      nav(ROUTE.PROFILE); // TODO: later change
    },
  });
}
