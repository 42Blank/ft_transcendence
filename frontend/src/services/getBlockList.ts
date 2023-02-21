import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { axiosGet } from './axiosWrapper';

export function getBlockList(): Promise<UserInfoType[]> {
  return axiosGet<UserInfoType[]>(API.BLOCK);
}
