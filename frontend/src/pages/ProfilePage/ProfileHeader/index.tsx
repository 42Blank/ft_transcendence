import { Avatar, Button } from 'common';
import { useGetUser } from 'hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  chatRoomListState,
  gameRoomListState,
  joinChatRoomState,
  joinSpectateRoomState,
  newChatRoomState,
  onlineUserListState,
} from 'store';
import { COMMON_SIZES } from 'styles';
import { EditProfileSection } from './EditProfileSection';
import { FriendsSection } from './FriendsSection';
import { TwoFactorAuthSection } from './TwoFactorAuthSection';

import {
  profileButtonSectionStyle,
  profileButtonStyle,
  profileHeaderAvatarStyle,
  profileHeaderWrapperStyle,
  profileNicknameSectionStyle,
} from './ProfileHeader.styles';

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
  const onlineUserList = useRecoilValue(onlineUserListState);
  const gameRoomList = useRecoilValue(gameRoomListState);
  const setJoinSpectateRoom = useSetRecoilState(joinSpectateRoomState);

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

  function handleClickSpectateButton() {
    const foundGameRoom = gameRoomList.find(gameRoom => {
      return gameRoom.host.user.id === id || (gameRoom.challenger && gameRoom.challenger.user.id === id);
    });

    if (!foundGameRoom) {
      return;
    }

    setJoinSpectateRoom({ id: foundGameRoom.id });
  }

  return (
    <header className={profileHeaderWrapperStyle}>
      <Avatar userAvatar={avatar} size={COMMON_SIZES.ICON_XXLARGE} className={profileHeaderAvatarStyle} />
      <div className={profileNicknameSectionStyle}>
        <h2>{nickname}</h2>
        <span>{point}점</span>
      </div>
      {id === myId ? (
        <div className={profileButtonSectionStyle}>
          <EditProfileSection />
          <TwoFactorAuthSection />
        </div>
      ) : (
        <div className={profileButtonSectionStyle}>
          {onlineUserList.find(onlineUser => onlineUser.userId === id && onlineUser.state === 'playing') && (
            <Button onClick={handleClickSpectateButton} className={profileButtonStyle}>
              <span>게임 보러가기</span>
            </Button>
          )}
          <Button onClick={handleClickDMButton} className={profileButtonStyle}>
            <span>DM</span>
          </Button>
          <FriendsSection userId={id} />
        </div>
      )}
    </header>
  );
};
