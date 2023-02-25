import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

interface Params {
  nickname: string;
}

export function postUserCheckDuplicateNickname({ nickname }: Params): Promise<boolean> {
  return axiosPost<Params, boolean>(API.USER_CHECK_DUPLICATE_NICKNAME, { nickname });
}
