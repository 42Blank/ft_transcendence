import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { getAllUserList } from 'services';
import { onlineUserListState } from 'store';

export function useGetAllUserList() {
  const onlineUserList = useRecoilValue(onlineUserListState);
  const { data: userList = [] } = useQuery(['all_user_list'], getAllUserList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,

    retry: 0,
  });

  return { userList, onlineUserList };
}
