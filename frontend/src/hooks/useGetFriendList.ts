import { getFriendList } from 'services';
import { useQuery } from 'react-query';

export function useGetFriendList() {
  const { data: friendList = [], refetch } = useQuery(['friend_list'], getFriendList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
    useErrorBoundary: true,
  });
  return { friendList, refetch };
}
