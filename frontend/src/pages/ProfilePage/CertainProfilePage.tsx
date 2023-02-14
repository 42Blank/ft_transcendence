import { useGetCertainUser } from 'hooks';

import { ProfileCard } from './ProfileCard';

export const CertainProfilePage = () => {
  const profile = useGetCertainUser();

  if (!profile) return <span>error</span>;
  return (
    <main>
      <h1>Profile Page</h1>
      <ProfileCard prop={profile} />
    </main>
  );
};
