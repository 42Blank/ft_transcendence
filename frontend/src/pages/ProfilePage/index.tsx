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

  const buttonRef = useRef<HTMLInputElement>(null);

  function displayEditModal(): void {
    // const modal: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName(
    //   'modal-test',
    // ) as HTMLCollectionOf<HTMLElement>;
    // console.log(modal[0]);
    // console.log(buttonRef.current);
    // modal[0].style.display = 'block';
    buttonRef.current.style.display = 'block';
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
      <div className="modal-test" ref={buttonRef}>
        <div className="modal-test-content">
          <span className="close">&times;</span>
          <p>Some text in the Modal ...</p>
        </div>
      </div>
    </main>
  );
};
