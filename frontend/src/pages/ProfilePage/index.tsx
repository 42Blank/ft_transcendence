import { useParams } from 'react-router-dom';

import { useGetUser } from 'hooks';

import { ProfileCard } from './ProfileCard';
import { ManageFriends } from './ManageFriends';
import { MatchHistoryList } from './MatchHistory';
import { AchievementList } from './Achievement';
import { TwoFactorAuth } from './TwoFactorAuth';
import { EditProfile } from './EditProfile';

import { achvStyle, cardStyle, histStyle, profileContainerStyle } from './Profile.style';

export const ProfilePage = () => {
  const { id } = useParams();
  const { data: profile, refetch } = useGetUser(id);
  const { data: myProfile } = useGetUser();

  if (!profile) return <span>error</span>;
  return (
    <main className={profileContainerStyle}>
      <div className={cardStyle}>
        <ProfileCard className="card" user={profile} />
        {!id || profile.id === myProfile.id ? (
          <>
            <EditProfile className="edit" user={profile} refetch={refetch} />
            <TwoFactorAuth className="2fa" />
          </>
        ) : (
          <ManageFriends className="friend" user={profile} />
        )}
      </div>
      <MatchHistoryList className={histStyle} userId={profile.id} />
      <AchievementList className={achvStyle} userId={profile.id} />
    </main>
  );
};
