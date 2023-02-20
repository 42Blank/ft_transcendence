import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from 'common';
import { useGetUser } from 'hooks';

import { ProfileCard } from './ProfileCard';
import { EditProfile } from './EditProfile';
import { ManageFriends } from './ManageFriends';
import { Achievement } from './Achievement';

export const ProfilePage = () => {
  const [isModalShown, setModalShown] = useState<Boolean>(false);
  const { id } = useParams();
  const { data: profile } = useGetUser(id);
  const { data: myProfile } = useGetUser();

  function handleOpenModal() {
    setModalShown(true);
  }

  function handleCloseModal() {
    setModalShown(false);
  }

  if (!profile) return <span>error</span>;
  return (
    <>
      <main>
        <h1>Profile Page</h1>
        <ProfileCard user={profile} />
        {(!id || profile.id === myProfile.id) && (
          <button type="button" onClick={handleOpenModal}>
            Edit Profile
          </button>
        )}
        {!(!id || profile.id === myProfile.id) && <ManageFriends user={profile} />}
        <Achievement userId={profile.id} />
      </main>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>
          <EditProfile onClickClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};
