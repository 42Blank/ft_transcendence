import { useGetUserList } from 'hooks';
import { deleteFriend } from 'services/deleteFriend';
import { postFriendOrBlock } from 'services/postFriendOrBlock';
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

  function handleClickUnfriendOrBlock() {
    deleteFriend(user.id);
  }

  function handleClickFriendOrBlock(userID: number, state: 'FRIEND' | 'BLOCK') {
    postFriendOrBlock({ recvFriendRequestUserId: userID, state });
  }

  return (
    <div>
      {friendState === 'Friend' && (
        <>
          <button type="button" onClick={handleClickUnfriendOrBlock}>
            Unfriend
          </button>
          <br />
        </>
      )}
      {friendState === 'No' && (
        <>
          <button type="button" onClick={() => handleClickFriendOrBlock(user.id, 'FRIEND')}>
            Add Friend
          </button>
          <br />
          <button type="button" onClick={() => handleClickFriendOrBlock(user.id, 'BLOCK')}>
            Block
          </button>
          <br />
        </>
      )}
      {friendState === 'Block' && (
        <>
          <button type="button" onClick={handleClickUnfriendOrBlock}>
            Unblock
          </button>
          <br />
        </>
      )}
    </div>
  );
};
