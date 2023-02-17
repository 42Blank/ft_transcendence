import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { axiosPost } from './axiosWrapper';

interface BodyObjType {
  nickname: string;
  avatar: string;
}

export async function postRegister(nickname: string, avatar: string): Promise<UserInfoType> {
  return axiosPost<BodyObjType, UserInfoType>(API.REGISTER, { nickname, avatar });
}
