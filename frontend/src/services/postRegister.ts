import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from '../types/user';
import { throwApiError } from '../utils/error';

// TODO: refactor me!! - by ycha
export async function postRegister(nickname: string, avatar: string): Promise<UserInfoType> {
  return axios
    .post<UserInfoType>(
      `${process.env.REACT_APP_SERVER}${API.REGISTER}`,
      {
        nickname,
        avatar,
      },
      {
        withCredentials: true,
      },
    )
    .then(({ data }) => data)
    .catch(throwApiError);
}
