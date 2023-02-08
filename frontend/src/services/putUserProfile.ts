import axios from 'axios';

import { API } from 'common/constants';

type newProfile = {
  nickname: string;
};

export function putUserProfile({ nickname }: newProfile): Promise<void> {
  return axios.put(
    `${process.env.REACT_APP_SERVER}${API.USER}`,
    { nickname },
    {
      withCredentials: true,
    },
  );
}
