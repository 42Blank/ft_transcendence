import { API } from 'common/constants';
import { axiosPut } from './axiosWrapper';

interface BodyObjType {
  nickname?: string;
  avatar?: string;
}

export function putUserProfile(nickname?: string, avatar?: string): Promise<void> {
  return axiosPut<BodyObjType>(API.USER, { nickname, avatar });
}
