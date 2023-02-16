import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from 'types/user';

interface Props {
  id: string;
}

export function getUserInfo({ id }: Props): Promise<void | UserInfoType> {
  return id
    ? axios
        .get(`${process.env.REACT_APP_SERVER}${API.USER}/${id}`, {
          withCredentials: true,
        })
        .then(res => {
          return res.data;
        })
    : axios
        .get(`${process.env.REACT_APP_SERVER}${API.USER_ME}`, {
          withCredentials: true,
        })
        .then(res => {
          return res.data;
        });
}
