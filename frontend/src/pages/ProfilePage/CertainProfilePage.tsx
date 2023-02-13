import { useGetCertainUser } from 'hooks';

import { ProfileCard } from './ProfileCard';

export const CertainProfilePage = () => {
  const profile = useGetCertainUser();

  if (!profile) return <span>error</span>;
  return (
    <main>
      <h1>Profile Page</h1>
      <ProfileCard
        id={profile.id}
        intraId={profile.intraId}
        nickname={profile.nickname}
        point={profile.point}
        createdAt={profile.createdAt}
        updatedAt={profile.updatedAt}
        avatar={profile.avatar}
      />
    </main>
  );
};
