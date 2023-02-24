import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { axiosGet } from './axiosWrapper';

export function getMatchHistory(userId: number): Promise<UserInfoType[]> {
  return axiosGet<UserInfoType[]>(`${API.MATCH}/${userId}`);
}
