import { useQuery } from 'react-query';

import { getMatchHistory } from 'services';

export function useGetMatchHistory(userId: number) {
  const { data: matchHistory = [], refetch } = useQuery([`match_history_${userId}`], () => getMatchHistory(userId), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
    useErrorBoundary: true,
  });
  return { matchHistory, refetch };
}
