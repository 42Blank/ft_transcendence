import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

interface Params {
  recvFriendRequestUserId: number;
}

export function postFriend({ recvFriendRequestUserId }: Params): Promise<void> {
  return axiosPost<Params & { status: 'FRIEND' }>(API.FRIEND, { recvFriendRequestUserId, status: 'FRIEND' });
}
