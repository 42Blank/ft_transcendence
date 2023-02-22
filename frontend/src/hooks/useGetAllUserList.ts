import { useQuery } from 'react-query';

import { getAllUserList } from 'services';

export function useGetAllUserList() {
  const { data: userList = [] } = useQuery(['all_user_list'], getAllUserList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    retry: 0,
  });

  return { userList };
}
