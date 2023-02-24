import { API } from 'common/constants';
import { MatchHistoryType } from 'types/profile';
import { axiosGet } from './axiosWrapper';

export async function getMatchHistoryById(matchHistoryId: number): Promise<MatchHistoryType> {
  return axiosGet<MatchHistoryType>(`${API.MATCH}/${matchHistoryId}`);
}
