import { AchievementType } from 'types/profile';
import { API } from 'common/constants';
import { axiosGet } from './axiosWrapper';

export async function getAchievementList(): Promise<AchievementType[]> {
  return axiosGet<AchievementType[]>(API.USER);
}
