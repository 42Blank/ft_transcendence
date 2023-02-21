import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { getAllUserList } from 'services';
import { onlineUserListState } from 'store';
import { UserInfoType } from 'types/user';
import { useEffect } from 'react';

export function useGetAllUserList() {
  const onlineUserList = useRecoilValue(onlineUserListState);
  const { data: userList = [] } = useQuery(['all_user_list'], getAllUserList, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    onSuccess: (data: UserInfoType[]) => {
      return data.map(value => ({ isOnline: onlineUserList.includes(value.id), ...value }));
    },
    retry: 0,
  });

  useEffect(() => {
    console.log(userList);
    console.log(onlineUserList);
  }, [userList]);

  return { userList };
}
