import { useGetCurrentUser } from 'hooks';
import { useState } from 'react';
import { EditModal } from './EditModal';

import { ProfileCard } from './ProfileCard';

import './tmp.css';

export const ProfilePage = () => {
  const [isVisible, setVisible] = useState<Boolean>(false);

  const profile = useGetCurrentUser();
  console.log(profile);

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
