import { useGetUser } from 'hooks';
import { UserInfoType } from 'types/user';

const DUMMY_FRIENDLIST: UserInfoType[] = [
  {
    id: -1,
    intraId: '',
    nickname: '',
    avatar: '',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
];

const DUMMY_BLOCKLIST: UserInfoType[] = [
  {
    id: -1,
    intraId: '',
    nickname: '',
    avatar: '',
    point: 0,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  },
];

type UserState = 'Friend' | 'No' | 'Block';

export const ManageFriends = ({ user }: { user: UserInfoType }) => {
  function classifyFriend(): UserState {
    if (DUMMY_FRIENDLIST.includes(user)) return 'Friend';
    if (DUMMY_BLOCKLIST.includes(user)) return 'Block';
    return 'No';
  }
  DUMMY_FRIENDLIST.push(useGetUser('2').data);
  DUMMY_BLOCKLIST.push(useGetUser('3').data);
  const isFriend: UserState = classifyFriend();
  return (
    <div>
      {isFriend === 'Friend' && (
        <>
          <button type="button"> Unfriend</button>
          <br />
        </>
      )}
      {isFriend === 'No' && (
        <>
          <button type="button">Add Friend</button>
          <br />
          <button type="button">Block</button>
          <br />
        </>
      )}
      {isFriend === 'Block' && (
        <>
          <button type="button">Unblock</button>
          <br />
        </>
      )}
    </div>
  );
};
