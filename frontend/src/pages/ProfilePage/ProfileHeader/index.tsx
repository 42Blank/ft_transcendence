import { Avatar, Button } from 'common';
import { useGetUser } from 'hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatRoomListState, joinChatRoomState, newChatRoomState } from 'store';
import { ManageFriends } from './ManageFriends';
// import { EditProfile } from './EditProfile';

import { profileHeaderAvatarStyle, profileHeaderWrapperStyle } from './ProfileHeader.styles';
import { TwoFactorAuthSection } from './TwoFactorAuthSection';

interface Props {
  userId?: string;
}

export const ProfileHeader = ({ userId }: Props) => {
  const {
    data: { id, nickname, point, avatar },
    // refetch,
  } = useGetUser(userId);
  const {
    data: { id: myId, nickname: myNickname },
  } = useGetUser();
  const chatRoomList = useRecoilValue(chatRoomListState);
  const setNewChatRoom = useSetRecoilState(newChatRoomState);
  const setJoinChatRoom = useSetRecoilState(joinChatRoomState);

  function handleClickDMButton() {
    const dmId = `${Math.min(myId, id)}-${Math.max(myId, id)}`;

    const chatRoomId = chatRoomList.find(chatRoom => chatRoom.dmId === dmId)?.id;
    if (chatRoomId) {
      setJoinChatRoom({ id: chatRoomId });
      return;
    }

    setNewChatRoom({
      roomTitle: `${myNickname}님과 ${nickname}님의 채팅방`,
      isPrivate: false,
      dmId,
    });
  }

  return (
    <header className={profileHeaderWrapperStyle}>
      <Avatar userAvatar={avatar} className={profileHeaderAvatarStyle} />
      <span>{nickname}</span>
      <div>
        <span>point</span>
        <span>{point}</span>
      </div>
      {!userId ? (
        <div>
          {/* <EditProfile refetch={refetch} /> */}
          <TwoFactorAuthSection />
        </div>
      ) : (
        <div>
          <Button onClick={handleClickDMButton}>
            <span>DM</span>
          </Button>
          <ManageFriends />
        </div>
      )}
    </header>
  );
};
