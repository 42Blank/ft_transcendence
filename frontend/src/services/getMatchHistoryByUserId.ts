import { API } from 'common/constants';
import { MatchHistoryType } from 'types/profile';
import { axiosGet } from './axiosWrapper';

export async function getMatchHistoryByUserId(userId: number): Promise<MatchHistoryType[]> {
  return axiosGet<MatchHistoryType[]>(`${API.MATCH_BY_USER}/${userId}`);
}
