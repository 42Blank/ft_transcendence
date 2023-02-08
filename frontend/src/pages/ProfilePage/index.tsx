import { useEffect, useState, useRef } from 'react';
import { getCurrentUserInfo } from 'services';
import { UserInfoType } from 'types/auth';

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

  const modalRef = useRef<HTMLInputElement>(null);

  function displayEditModal(): void {
    modalRef.current.style.display = 'block';
  }

  function exitEditModal(): void {
    modalRef.current.style.display = 'none';
  }

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
      <button type="button" onClick={displayEditModal}>
        Edit Profile
      </button>
      <div className="modal-test" ref={modalRef}>
        <div className="modal-test-content">
          <button type="button" className="close" onClick={exitEditModal}>
            &times;
          </button>
          <p>Some text in the Modal ...</p>
        </div>
      </div>
    </main>
  );
};
