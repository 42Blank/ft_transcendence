import { useState } from 'react';

import { Modal } from 'common';

import { EditProfileModal } from './EditProfileModal';

export const EditProfile = () => {
  const [isModalShown, setModalShown] = useState<Boolean>(false);

  function handleOpenModal() {
    setModalShown(true);
  }

  function handleCloseModal() {
    setModalShown(false);
  }

  return (
    <>
      <div>
        <button type="button" onClick={handleOpenModal}>
          Edit Profile
        </button>
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>
          <EditProfileModal onClickClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};
