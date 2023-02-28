import { Button } from 'common';
import { useGetBlockList, useGetFriendList } from 'hooks';
import { postBlock, postFriend, deleteFriend } from 'services';
import { profileButtonSectionBottomStyle, profileButtonStyle } from './ProfileHeader.styles';

interface Props {
  userId: number;
}

export const FriendsSection = ({ userId }: Props) => {
  const { friendList, refetch: refetchFriendList } = useGetFriendList();
  const { blockList, refetch: refetchBlockList } = useGetBlockList();

  const friendState = (function getFriendType() {
    if (friendList.some(user => user.id === userId)) return 'friend';
    if (blockList.some(user => user.id === userId)) return 'block';
    return null;
  })();

  function handleClickAddFriendButton() {
    postFriend(userId).then(() => {
      refetchFriendList();
    });
  }

  function handleClickRemoveFriendStateButton() {
    deleteFriend(userId).then(() => {
      refetchFriendList();
      refetchBlockList();
    });
  }

  function handleClickBlockButton() {
    postBlock(userId).then(() => {
      refetchBlockList();
    });
  }

  if (!friendState)
    return (
      <div className={profileButtonSectionBottomStyle}>
        <Button onClick={handleClickAddFriendButton} className={profileButtonStyle}>
          <span>친구 추가</span>
        </Button>
        <Button onClick={handleClickBlockButton} className={profileButtonStyle}>
          <span>차단</span>
        </Button>
      </div>
    );
  return (
    <div className={profileButtonSectionBottomStyle}>
      <Button onClick={handleClickRemoveFriendStateButton} className={profileButtonStyle}>
        <span>{friendState === 'friend' ? '친구 삭제' : '차단 해제'}</span>
      </Button>
    </div>
  );
};
