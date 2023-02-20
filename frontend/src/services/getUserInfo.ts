import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { axiosGet } from './axiosWrapper';

interface Params {
  userId?: string;
}

export function getUserInfo({ userId }: Params): Promise<UserInfoType> {
  return axiosGet<UserInfoType>(userId ? `${API.USER}/${userId}` : API.USER_ME);
}
