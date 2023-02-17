import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from 'types/user';

interface Props {
  id?: string;
}

export function getUserInfo({ id }: Props): Promise<void | UserInfoType> {
  return axios
    .get(`${process.env.REACT_APP_SERVER}${id ? `${API.USER}/${id}` : API.USER_ME}`, {
      withCredentials: true,
    })
    .then(res => {
      return res.data;
    });
}
