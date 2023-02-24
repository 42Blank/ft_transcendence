import { useState } from 'react';

import { Modal } from 'common';
import { UserInfoType } from 'types/user';
import { EditProfileModal } from './EditProfileModal';
import { editProfileButtonStyle } from './ProfileCard.style';

interface Props {
  user: UserInfoType;
  refetch: () => void;
}

export const EditProfile = ({ user, refetch }: Props) => {
  const [isModalShown, setIsModalShown] = useState<Boolean>(false);

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
  }

  return (
    <>
      <div className={editProfileButtonStyle}>
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
