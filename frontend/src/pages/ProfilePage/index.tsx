import { useEffect, useState } from 'react';
import { getCurrentUserInfo } from 'services';
import { UserInfoType } from 'types/auth';

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserInfoType>();

  useEffect(() => {
    getCurrentUserInfo().then((res: void | UserInfoType) => {
      if (!res) throw Error();
      // When Successed
      setProfile(res);
    });
  }, []);
  console.log(profile);

  if (!profile) return <span>error</span>;
  return (
    <main>
      <h1>Profile Page</h1>
      {/* make profile card */}
      <div>
        <img src={profile.avatar} alt="avatar" />
        <h1>{profile.nickname}</h1>
      </div>
    </main>
  );
};
