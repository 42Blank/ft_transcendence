import { useState } from 'react';

import { Modal } from 'common';
import { UserInfoType } from 'types/user';

import { EditProfileModal } from './EditProfileModal';

interface Props {
  user: UserInfoType;
  refetch: () => void;
  className?: string;
}

export const EditProfile = ({ user, refetch, className }: Props) => {
  const [isModalShown, setModalShown] = useState<Boolean>(false);

  function handleOpenModal() {
    setModalShown(true);
  }

  function handleCloseModal() {
    setModalShown(false);
  }

  return (
    <>
      <div className={className}>
        <button type="button" onClick={handleOpenModal}>
          Edit Profile
        </button>
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>
          <EditProfileModal onClickClose={handleCloseModal} user={user} refetch={refetch} />
        </Modal>
      )}
    </>
  );
};
