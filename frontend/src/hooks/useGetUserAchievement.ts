import { useQuery } from 'react-query';

import { getUserAchievement } from 'services';

export function useGetUserAchievement(userId: number) {
  const { data: userAchievement = [], refetch } = useQuery(
    [`achievement_${userId}`],
    () => getUserAchievement(userId),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      retry: 0,
      useErrorBoundary: true,
    },
  );
  return { userAchievement, refetch };
}
