import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from 'common';
import { useGetUser } from 'hooks';

import { ProfileCard } from './ProfileCard';
import { EditNickModal, EditAvatarModal } from './ProfileModal';

export const ProfilePage = () => {
  const [isNickModalShown, setNickModalShown] = useState<Boolean>(false);
  const [isAvatarModalShown, setAvatarModalShown] = useState<Boolean>(false);
  const { id } = useParams();
  const { data: profile, userId } = useGetUser(id);

  function handleOpenNickModal() {
    setNickModalShown(true);
  }

  function handleCloseNickModal() {
    setNickModalShown(false);
  }

  function handleOpenAvatarModal() {
    setAvatarModalShown(true);
  }

  function handleCloseAvatarModal() {
    setAvatarModalShown(false);
  }

  if (!profile) return <span>error</span>;
  return (
    <>
      <main>
        <h1>Profile Page</h1>
        <ProfileCard user={profile} />
        {!userId && (
          <>
            <button type="button" onClick={handleOpenNickModal}>
              Edit Nickname
            </button>
            <button type="button" onClick={handleOpenAvatarModal}>
              Edit Avatar
            </button>
          </>
        )}
      </main>
      {isNickModalShown && (
        <Modal onClickClose={handleCloseNickModal}>
          <EditNickModal onClickClose={handleCloseNickModal} />
        </Modal>
      )}
      {isAvatarModalShown && (
        <Modal onClickClose={handleCloseAvatarModal}>
          <EditAvatarModal onClickClose={handleCloseAvatarModal} />
        </Modal>
      )}
    </>
  );
};
