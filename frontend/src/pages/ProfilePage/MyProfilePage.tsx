import { useState } from 'react';

import { Modal } from 'common';
import { useGetCurrentUser } from 'hooks';
import { ProfileCard } from './ProfileCard';
import { EditForm } from './EditForm';

export const MyProfilePage = () => {
  const [isVisible, setVisible] = useState<Boolean>(false);
  const { data: profile } = useGetCurrentUser();

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  if (!profile) return <span>error</span>;
  return (
    <>
      <main>
        <h1>Profile Page</h1>
        <ProfileCard prop={profile} />
        <button type="button" onClick={handleOpenModal}>
          Edit Profile
        </button>
      </main>
      {isVisible && (
        <Modal onClickClose={handleCloseModal}>
          <EditForm onClickClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};
