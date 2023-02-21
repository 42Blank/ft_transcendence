import axios from 'axios';

import { API } from 'common/constants';

interface Params {
  nickname?: string;
  avatar?: string;
}

export function putUserProfile({ nickname, avatar }: Params): Promise<void> {
  return axios.put(
    `${process.env.REACT_APP_SERVER}${API.USER}`,
    { nickname, avatar },
    {
      withCredentials: true,
    },
  );
}
