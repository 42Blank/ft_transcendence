import { AchievementType } from 'types/profile';
import { API } from 'common/constants';
import { axiosGet } from './axiosWrapper';

export async function getUserAchievement(userId: number): Promise<AchievementType[]> {
  return axiosGet<AchievementType[]>(`${API.ACHIEVEMENT}/${userId}`);
}
