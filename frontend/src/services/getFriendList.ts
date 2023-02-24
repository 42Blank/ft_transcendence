import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { axiosGet } from './axiosWrapper';

export async function getFriendList(): Promise<UserInfoType[]> {
  return axiosGet<UserInfoType[]>(API.FRIEND);
}
