import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { throwApiError } from 'utils/error';

export async function getFriendList(): Promise<UserInfoType[]> {
  return axios
    .get<UserInfoType[]>(`${process.env.REACT_APP_SERVER}${API.FRIEND}`, {
      withCredentials: true,
    })
    .then(({ data }) => data)
    .catch(throwApiError);
}
