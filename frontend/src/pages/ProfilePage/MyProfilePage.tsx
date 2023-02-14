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
      <ProfileCard prop={profile} />
      <button type="button" onClick={() => setVisible(true)}>
        Edit Profile
      </button>
      {isVisible && <EditModal setModal={setVisible} />}
    </main>
  );
};
