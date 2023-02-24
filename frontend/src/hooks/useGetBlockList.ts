import { useQuery } from 'react-query';

import { getBlockList } from 'services';

export function useGetBlockList() {
  const { data: blockList = [], refetch } = useQuery(['block_list'], getBlockList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
    useErrorBoundary: true,
  });
  return { blockList, refetch };
}
