import { getFriendList } from 'services';
import { useQuery } from 'react-query';

export function useGetFriendList() {
  const { data: friendList = [], refetch } = useQuery(['friend_list'], getFriendList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12, // TODO: 적절한 시간으로 수정
    retry: 0,
    useErrorBoundary: true,
  });
  return { friendList, refetch };
}
