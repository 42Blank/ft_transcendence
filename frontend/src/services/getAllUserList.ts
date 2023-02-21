import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { axiosGet } from './axiosWrapper';

export async function getAllUserList(): Promise<UserInfoType[]> {
  return axiosGet<UserInfoType[]>(API.USER);
}
