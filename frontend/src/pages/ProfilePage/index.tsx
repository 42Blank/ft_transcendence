import { useEffect, useState } from 'react';
import { getCurrentUserInfo } from 'services';
import { UserInfoType } from 'types/auth';
import { EditModal } from './EditModal';

import { ProfileCard } from './ProfileCard';

import './tmp.css';

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserInfoType>();

  useEffect(() => {
    getCurrentUserInfo().then((res: void | UserInfoType) => {
      if (!res) throw Error();
      setProfile(res);
    });
  }, []);

  const [isVisible, setVisible] = useState<Boolean>(false);

  if (!profile) return <span>error</span>;
  return (
    <main>
      <h1>Profile Page</h1>
      <ProfileCard
        id={profile.id}
        intraID={profile.intraID}
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
