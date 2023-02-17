import axios from 'axios';

import { API } from 'common/constants';
import { UserInfoType } from 'types/user';
import { throwAxiosFtError } from '../utils/error/throwAxiosFtError';

interface Props {
  userId?: string;
}

export function getUserInfo({ userId }: Props): Promise<UserInfoType> {
  return axios
    .get<UserInfoType>(`${process.env.REACT_APP_SERVER}${userId ? `${API.USER}/${userId}` : API.USER_ME}`, {
      withCredentials: true,
    })
    .then(({ data }) => data)
    .catch(throwAxiosFtError);
}
