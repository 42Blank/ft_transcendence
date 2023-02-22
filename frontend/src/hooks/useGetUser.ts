import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getUserInfo } from 'services';
import { UserInfoType } from 'types/user';
import { ROUTE } from 'common/constants';

const INIT_DATA: UserInfoType = {
  id: -1,
  intraId: '',
  nickname: '',
  avatar: '',
  point: 0,
  createdAt: '1970-01-01T00:00:00.000Z',
  updatedAt: '1970-01-01T00:00:00.000Z',
};

export function useGetUser(userId?: string) {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { data = INIT_DATA, refetch } = useQuery(
    [userId ? `user-${userId}` : 'user-me'],
    () => getUserInfo({ userId }),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      retry: 0,
      useErrorBoundary: !!userId,
      onSuccess: () => {
        if (!userId && pathname === ROUTE.LOGIN) nav(ROUTE.CHAT);
      },
      onError: () => {
        if (!userId) nav(ROUTE.LOGIN);
      },
    },
  );

  return { data, refetch };
}
