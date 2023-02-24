import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Modal } from 'common';
import { DUMMY_2FA } from 'store/dummy2FA';
import { Enable2FA } from './Enable2FA';
import { Cancle2FA } from './Cancle2FA';

import { twoFactorAuthStyle } from '../ProfileCard.style';

export const TwoFactorAuth = () => {
  const dummy2FA = useRecoilValue(DUMMY_2FA);

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
        <input type="checkbox" checked={dummy2FA.isChecked} readOnly />
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>{dummy2FA.isChecked ? <Cancle2FA /> : <Enable2FA />}</Modal>
      )}
    </>
  );
};
