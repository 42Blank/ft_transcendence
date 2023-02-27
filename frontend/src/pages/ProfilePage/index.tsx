import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useGetUser } from 'hooks';
import { AchievementList } from './Achievement';
import { EditProfile } from './EditProfile';
import { ManageFriends } from './ManageFriends';
import { MatchHistoryList } from './MatchHistory';
import { ProfileCard } from './ProfileCard';
import { TwoFactorAuth } from './TwoFactorAuth';

import { chatRoomListState, joinChatRoomState, newChatRoomState } from '../../store';
import { achvStyle, cardStyle, histStyle, profileContainerStyle } from './Profile.style';

export const ProfilePage = () => {
  const { id } = useParams();
  const { data: profile, refetch } = useGetUser(id);
  const { data: myProfile } = useGetUser();

  const chatRoomList = useRecoilValue(chatRoomListState);
  const setNewChatRoom = useSetRecoilState(newChatRoomState);
  const setJoinChatRoom = useSetRecoilState(joinChatRoomState);

  function handleDm(e: FormEvent) {
    e.preventDefault();

    const myId = myProfile.id;
    const otherId = profile.id;
    const dmId = `${Math.min(myId, otherId)}-${Math.max(myId, otherId)}`;

    const chatRoomId = chatRoomList.find(chatRoom => chatRoom.dmId === dmId)?.id;
    if (chatRoomId) {
      setJoinChatRoom({ id: chatRoomId });
      return;
    }

    setNewChatRoom({
      roomTitle: `${myProfile.nickname}님과 ${profile.nickname}님의 채팅방`,
      isPrivate: false,
      dmId,
    });
  }

  if (profile.id === -1) return <span>Loading profile....</span>;
  return (
    <main className={profileContainerStyle}>
      <div className={cardStyle}>
        <ProfileCard user={profile} />
        {!id || profile.id === myProfile.id ? (
          <>
            <EditProfile user={profile} refetch={refetch} />
            <TwoFactorAuth />
          </>
        ) : (
          <>
            <button type="button" onClick={handleDm}>
              <span>DM</span>
            </button>
            <ManageFriends user={profile} />
          </>
        )}
      </div>

      <MatchHistoryList className={histStyle} userId={profile.id} />
      <AchievementList className={achvStyle} userId={profile.id} />
    </main>
  );
};
