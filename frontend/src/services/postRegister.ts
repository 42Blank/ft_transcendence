import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { axiosPost } from './axiosWrapper';

interface Params {
  nickname: string;
  avatar: string;
}

export async function postRegister({ nickname, avatar }: Params): Promise<UserInfoType> {
  return axiosPost<Params, UserInfoType>(API.REGISTER, { nickname, avatar });
}
