import { useState } from 'react';

import { Modal } from 'common';
import { Enable2FA } from './Enable2FA';
import { Cancle2FA } from './Cancle2FA';

import { twoFactorAuthStyle } from '../ProfileCard.style';

interface TwoFactorAuthType {
  isChecked: boolean;
}

const DUMMY_2FA: TwoFactorAuthType = {
  isChecked: false,
};

export const TwoFactorAuth = () => {
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
          Two-Factor Authentication
        </button>
        <input type="checkbox" checked={DUMMY_2FA.isChecked} readOnly />
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>{DUMMY_2FA.isChecked ? <Cancle2FA /> : <Enable2FA />}</Modal>
      )}
    </>
  );
};
