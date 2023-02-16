import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from '../types/user';
import { FtError, isAxiosFtErrorResponse } from '../utils/error';

// TODO: refactor me!! - by ycha
export async function getLogin(): Promise<UserInfoType> {
  return axios
    .get<UserInfoType>(`${process.env.REACT_APP_SERVER}${API.LOGIN}`, {
      withCredentials: true,
    })
    .then(({ data }) => data)
    .catch((error: unknown) => {
      if (isAxiosFtErrorResponse(error)) {
        throw new FtError(error.response.data);
      }

      throw error;
    });
}
