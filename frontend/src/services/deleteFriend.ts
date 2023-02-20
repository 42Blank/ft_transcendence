import axios from 'axios';

import { API } from 'common/constants';

export function deleteFriend(recvFriendRequestUserId: number): Promise<void> {
  return axios.delete(`${process.env.REACT_APP_SERVER}${API.FRIEND}`, {
    data: { recvFriendRequestUserId },
    withCredentials: true,
  });
}
