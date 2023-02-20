import axios from 'axios';

import { API } from 'common/constants';

interface Props {
  recvFriendRequestUserId: number;
  state: 'FRIEND' | 'BLOCK';
}

export function postFriendOrBlock({ recvFriendRequestUserId, state }: Props): Promise<void> {
  return axios.post(
    `${process.env.REACT_APP_SERVER}${API.FRIEND}`,
    { recvFriendRequestUserId, state },
    {
      withCredentials: true,
    },
  );
}
