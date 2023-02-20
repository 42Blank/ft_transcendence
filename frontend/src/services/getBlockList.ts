import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { throwApiError } from 'utils/error';

export function getBlockList(): Promise<UserInfoType[]> {
  return axios
    .get<UserInfoType[]>(`${process.env.REACT_APP_SERVER}${API.BLOCK}`, {
      withCredentials: true,
    })
    .then(({ data }) => data)
    .catch(throwApiError);
}
