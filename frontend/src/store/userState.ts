import { atom } from 'recoil';
import { UserInfoType } from 'types/user';

export const userState = atom<UserInfoType>({
  key: 'userState',
  default: {
    id: -1,
    intraId: '',
    nickname: '',
    avatar: '',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
});
