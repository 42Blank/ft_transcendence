import { useParams } from 'react-router-dom';

import { useGetUser } from 'hooks';
import { AchievementList } from './Achievement';
import { MatchHistoryList } from './MatchHistory';

import { achvStyle, cardStyle, histStyle, profileContainerStyle } from './ProfilePage.styles';
import { ProfileHeader } from './ProfileHeader';

export const ProfilePage = () => {
  const { id } = useParams();
  const { data: profile } = useGetUser(id);

  if (profile.id === -1) return <span>Loading profile....</span>;
  return (
    <main className={profileContainerStyle}>
      <div className={cardStyle}>
        <ProfileHeader userId={id} />
      </div>
      <MatchHistoryList className={histStyle} userId={profile.id} />
      <AchievementList className={achvStyle} userId={profile.id} />
    </main>
  );
};
