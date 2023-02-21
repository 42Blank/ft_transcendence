import { API } from 'common/constants';
import { axiosPut } from './axiosWrapper';

interface Params {
  nickname?: string;
  avatar?: string;
}

export function putUserProfile({ nickname, avatar }: Params): Promise<void> {
  return axiosPut<Params>(API.USER, { nickname, avatar });
}
