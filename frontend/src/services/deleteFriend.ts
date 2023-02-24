import { API } from 'common/constants';
import { axiosDelete } from './axiosWrapper';

interface BodyObjType {
  recvFriendRequestUserId: number;
}

export function deleteFriend(recvFriendRequestUserId: number): Promise<void> {
  return axiosDelete<BodyObjType>(API.FRIEND, { recvFriendRequestUserId });
}
