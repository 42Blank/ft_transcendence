import axios from 'axios';

import { API } from 'common/constants';

interface Props {
  recvFriendRequestUserId: number;
  status: 'FRIEND' | 'BLOCK';
}

export function postFriendOrBlock({ recvFriendRequestUserId, status }: Props): Promise<void> {
  return axios.post(
    `${process.env.REACT_APP_SERVER}${API.FRIEND}`,
    { recvFriendRequestUserId, status },
    {
      withCredentials: true,
    },
  );
}