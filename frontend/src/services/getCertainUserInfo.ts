import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from 'types/user';

type PropType = {
  id: number;
};

export function getCertainUserInfo({ id }: PropType): Promise<void | UserInfoType> {
  return axios
    .get(`${process.env.REACT_APP_SERVER}${API.USER}/${id}`, {
      withCredentials: true,
    })
    .then(res => {
      return res.data;
    });
}
