import { useGetUserList } from 'hooks';
import { UserInfoType } from 'types/user';

type UserState = 'Friend' | 'No' | 'Block';

export const ManageFriends = ({ user }: { user: UserInfoType }) => {
  const { friendList, blockList } = useGetUserList();

  function checkFriend(userList: UserInfoType): Boolean {
    return user.id === userList.id;
  }

  function classifyFriend(): UserState {
    if (friendList.some(checkFriend)) {
      return 'Friend';
    }
    if (blockList.some(checkFriend)) return 'Block';
    return 'No';
  }

  const friendState: UserState = classifyFriend();
  return (
    <div>
      {friendState === 'Friend' && (
        <>
          <button type="button"> Unfriend</button>
          <br />
        </>
      )}
      {friendState === 'No' && (
        <>
          <button type="button">Add Friend</button>
          <br />
          <button type="button">Block</button>
          <br />
        </>
      )}
      {friendState === 'Block' && (
        <>
          <button type="button">Unblock</button>
          <br />
        </>
      )}
    </div>
  );
};
