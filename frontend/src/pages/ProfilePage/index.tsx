import { useParams } from 'react-router-dom';

import { useGetUser } from 'hooks';
import { ProfileCard } from './ProfileCard';
import { ManageFriends } from './ManageFriends';
import { MatchHistoryList } from './MatchHistory';
import { AchievementList } from './Achievement';
import { TwoFactorAuth } from './TwoFactorAuth';
import { EditProfile } from './EditProfile';

export const ProfilePage = () => {
  const { id } = useParams();
  const { data: profile, refetch } = useGetUser(id);
  const { data: myProfile } = useGetUser();

  if (!profile) return <span>error</span>;
  return (
    <main>
      <h1>Profile Page</h1>
      <ProfileCard user={profile} />
      {!id || profile.id === myProfile.id ? (
        <>
          <TwoFactorAuth />
          <EditProfile user={profile} refetch={refetch} />
        </>
      ) : (
        <ManageFriends user={profile} />
      )}
      <MatchHistoryList userId={profile.id} />
      <AchievementList userId={profile.id} />
    </main>
  );
};
