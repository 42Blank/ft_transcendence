import { AchievementType } from 'types/profile';
import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

export async function postUserAchievement(userId: number): Promise<AchievementType> {
  return axiosPost<number, AchievementType>(API.ACHIEVEMENT, userId);
}
