import { getBlockList, getFriendList } from 'services';
import { useQuery } from 'react-query';

export function useGetUserList() {
  const { data: friendList = [], refetch: refetchFriendList } = useQuery(['friend_list'], getFriendList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
    useErrorBoundary: true,
  });
  const { data: blockList = [], refetch: refetchBlockList } = useQuery(['block_list'], getBlockList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
    useErrorBoundary: true,
  });
  return { friendList, blockList, refetchFriendList, refetchBlockList };
}
