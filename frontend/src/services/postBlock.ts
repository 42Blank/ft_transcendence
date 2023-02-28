import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

interface Params {
  recvFriendRequestUserId: number;
  status: 'BLOCK';
}

export function postBlock(userId: number): Promise<void> {
  return axiosPost<Params>(API.FRIEND, { recvFriendRequestUserId: userId, status: 'BLOCK' });
}
