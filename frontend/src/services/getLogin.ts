import axios from 'axios';

import { API } from 'common/constants';
import { throwApiError } from 'utils/error/throwApiError';
import { UserInfoType } from '../types/user';

// TODO: refactor me!! - by ycha
export async function getLogin(): Promise<UserInfoType> {
  return axios
    .get<UserInfoType>(`${process.env.REACT_APP_SERVER}${API.LOGIN}`, {
      withCredentials: true,
    })
    .then(({ data }) => data)
    .catch(throwApiError);
}
