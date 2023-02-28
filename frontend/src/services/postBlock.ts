import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

interface Params {
  recvFriendRequestUserId: number;
}

export function postBlock({ recvFriendRequestUserId }: Params): Promise<void> {
  return axiosPost<Params & { status: 'BLOCK' }>(API.FRIEND, { recvFriendRequestUserId, status: 'BLOCK' });
}
