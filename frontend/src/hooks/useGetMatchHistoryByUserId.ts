import { useQuery } from 'react-query';

import { getMatchHistoryByUserId } from 'services';

export function useGetMatchHistoryByUserId(userId: number) {
  const { data: matchHistory = [], refetch } = useQuery(
    [`match_history_user_${userId}`],
    () => getMatchHistoryByUserId(userId),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      retry: 0,
      useErrorBoundary: true,
    },
  );
  return { matchHistory, refetch };
}
