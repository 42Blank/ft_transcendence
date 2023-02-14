import { useState } from 'react';

import { useGetCurrentUser } from 'hooks';
import { ProfileCard } from './ProfileCard';
import { EditModal } from './EditModal';

export const MyProfilePage = () => {
  const [isVisible, setVisible] = useState<Boolean>(false);

  const { data: profile } = useGetCurrentUser();

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
      <button type="button" onClick={() => setVisible(true)}>
        Edit Profile
      </button>
      {isVisible && <EditModal setModal={setVisible} />}
    </main>
  );
};
