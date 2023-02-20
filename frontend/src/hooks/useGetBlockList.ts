import { getBlockList } from 'services';
import { useQuery } from 'react-query';

export function useGetBlockList() {
  const { data: blockList = [], refetch } = useQuery(['block_list'], getBlockList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12, // TODO: 적절한 시간으로 수정
    retry: 0,
    useErrorBoundary: true,
  });
  return { blockList, refetch };
}
