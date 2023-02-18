// import { useState } from 'react';
import { UserInfoType } from 'types/user';

const DUMMY_FRIENDLIST: UserInfoType[] = [
  {
    id: 2,
    intraId: '',
    nickname: '',
    avatar: '',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
];

const DUMMY_BlOCKLIST: UserInfoType[] = [
  {
    id: 3,
    intraId: '',
    nickname: '',
    avatar: '',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
];

export const ManageFriends = ({ user }: { user: UserInfoType }) => {
  return (
    <div>
      <button type="button"> Unfriend</button>
      <br />
      <button type="button">Add Friend</button>
      <br />
      <button type="button">Block</button>
      <br />
      <button type="button">Unblock</button>
    </div>
  );
};
