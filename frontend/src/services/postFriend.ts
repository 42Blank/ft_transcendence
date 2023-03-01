import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

interface Params {
  recvFriendRequestUserId: number;
  status: 'FRIEND';
}

export function postFriend(userId: number): Promise<void> {
  return axiosPost<Params>(API.FRIEND, { recvFriendRequestUserId: userId, status: 'FRIEND' });
}
