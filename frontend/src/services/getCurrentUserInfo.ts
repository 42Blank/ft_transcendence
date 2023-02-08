import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from 'types/user';

export function getCurrentUserInfo(): Promise<void | UserInfoType> {
  return axios
    .get(`${process.env.REACT_APP_SERVER}${API.USER_ME}`, {
      withCredentials: true,
    })
    .then(res => {
      return res.data;
    });
}
