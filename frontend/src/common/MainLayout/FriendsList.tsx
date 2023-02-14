import { UserInfoType } from 'types/user';

import { FriendsListElement } from './FriendsListElement';

import { friendsListStyle, friendsListTitleStyle } from './FriendsList.styles';

const DUMMY_FRIENDS: UserInfoType[] = [
  {
    id: 1,
    nickname: '자송 the 엄청긴닉네임소유자',
    intraId: '11111',
    avatar: 'https://cdn.intra.42.fr/users/b3af07505013b8500276523f65b49ff1/jasong.JPG',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    nickname: '인초',
    intraId: '22222',
    avatar: 'https://cdn.intra.42.fr/users/56349981baaeb98352399a47e79adc48/incho.jpg',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    nickname: '지소캉',
    intraId: '33333',
    avatar: 'https://cdn.intra.42.fr/users/63cb73a519cf84dd6277b8df2a24da89/jisokang.PNG',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
  {
    id: 4,
    nickname: '영차',
    intraId: '44444',
    avatar: 'https://cdn.intra.42.fr/users/6038c103da3bb9180a072f8154e6b428/ycha.jpg',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
  {
    id: 5,
    nickname: '지최',
    intraId: '55555',
    avatar: 'https://cdn.intra.42.fr/users/b9c44cf9ae13ffec04381638c0a2f204/jiychoi.jpg',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
];

interface Props {
  isOpen: boolean;
}

export const FriendsList = ({ isOpen }: Props) => {
  return (
    <aside className={friendsListStyle(isOpen)}>
      <h2 className={friendsListTitleStyle}>친구 목록</h2>
      <ul>
        {DUMMY_FRIENDS.map(userInfo => (
          <FriendsListElement userInfo={userInfo} key={`friend-${userInfo.id}`} />
        ))}
      </ul>
    </aside>
  );
};
