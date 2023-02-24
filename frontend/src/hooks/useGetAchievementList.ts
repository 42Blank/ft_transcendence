import { useQuery } from 'react-query';

import { getAchievementList } from 'services';

export function useGetAchievementList() {
  const { data: achievementList = [], refetch } = useQuery(['block_list'], getAchievementList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
    useErrorBoundary: true,
  });
  return { achievementList, refetch };
}
