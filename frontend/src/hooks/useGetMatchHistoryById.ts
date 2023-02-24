import { useQuery } from 'react-query';

import { getMatchHistoryById } from 'services';
import { MatchHistoryType } from 'types/profile';
import { UserInfoType } from 'types/user';

const USER_DATA: UserInfoType = {
  id: -1,
  intraId: '',
  nickname: '',
  avatar: '',
  point: 0,
  createdAt: '1970-01-01T00:00:00.000Z',
  updatedAt: '1970-01-01T00:00:00.000Z',
};

const INIT_DATA: MatchHistoryType = {
  id: -1,
  winner: USER_DATA,
  loser: USER_DATA,
  createdAt: '1970-01-01T00:00:00.000Z', // TODO: replace to Date type ?
};

export function useGetMatchHistoryById(id: number) {
  const { data = INIT_DATA, refetch } = useQuery([`match_history_${id}`], () => getMatchHistoryById(id), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
    useErrorBoundary: true,
  });
  return { data, refetch };
}
