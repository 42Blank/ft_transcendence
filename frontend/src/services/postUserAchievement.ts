import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

export async function postUserAchievement(userId: number): Promise<void> {
  return axiosPost<number>(`${API.ACHIEVEMENT}/${userId}`);
}
