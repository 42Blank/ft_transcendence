import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getCertainUserInfo } from 'services';
import { UserInfoType } from 'types/user';

const INIT_DATA: UserInfoType = {
  id: -1,
  intraId: '',
  nickname: '',
  avatar: '',
  point: 0,
  createdAt: '1970-01-01T00:00:00.000Z',
  updatedAt: '1970-01-01T00:00:00.000Z',
};

export function useGetCertainUser() {
  const id = Number(useParams().id);
  const nav = useNavigate();
  const { data = INIT_DATA } = useQuery([`User${id}`], () => getCertainUserInfo({ id }), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12, // TODO: 적절한 시간으로 수정
    retry: 0,
    onError: () => {
      nav(ROUTE.ERROR);
    },
  });

  return data;
}
