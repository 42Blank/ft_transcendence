import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

interface Params {
  recvFriendRequestUserId: number;
  status: 'FRIEND' | 'BLOCK';
}

export function postFriendOrBlock({ recvFriendRequestUserId, status }: Params): Promise<void> {
  return axiosPost<Params>(API.FRIEND, { recvFriendRequestUserId, status });
}
