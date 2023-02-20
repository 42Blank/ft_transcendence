import { getBlockList, getFriendList } from 'services';
import { useQuery } from 'react-query';

export function useGetUserList() {
  const { data: friendList } = useQuery(['friend_list'], getFriendList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12, // TODO: 적절한 시간으로 수정
    retry: 0,
    useErrorBoundary: true,
  });
  const { data: blockList } = useQuery(['block_list'], getBlockList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12, // TODO: 적절한 시간으로 수정
    retry: 0,
    useErrorBoundary: true,
  });
  return { friendList, blockList };
}
