import { API } from 'common/constants';
import { MatchHistoryType } from 'types/profile';
import { axiosGet } from './axiosWrapper';

export async function getMatchHistory(userId: number): Promise<MatchHistoryType[]> {
  return axiosGet<MatchHistoryType[]>(`${API.MATCH}/${userId}`);
}
