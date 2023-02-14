import axios from 'axios';

import { API } from 'common/constants';

type newProfile = {
  nickname?: string;
  avatar?: string;
};

export function putUserProfile({ nickname, avatar }: newProfile): Promise<void> {
  return axios.put(
    `${process.env.REACT_APP_SERVER}${API.USER}`,
    { nickname, avatar },
    {
      withCredentials: true,
    },
  );
}
// Edit use reactQuery
// Update Current user state
