import { useState } from 'react';

import { Modal } from 'common';
import { useGetUser } from 'hooks';
import { Enable2FA } from './Enable2FA';
import { Cancle2FA } from './Cancle2FA';

import { twoFactorAuthStyle } from '../ProfileCard.style';

export const TwoFactorAuth = () => {
  const { data: user } = useGetUser();

  const [isModalShown, setIsModalShown] = useState<Boolean>(false);

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
  }

  return (
    <>
      <div className={twoFactorAuthStyle}>
        <button type="button" onClick={handleOpenModal}>
          <span>Two-Factor Authentication</span>
        </button>
        <input type="checkbox" checked={user.isTwoFactorAuth} readOnly />
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>{user.isTwoFactorAuth ? <Cancle2FA /> : <Enable2FA />}</Modal>
      )}
    </>
  );
};
