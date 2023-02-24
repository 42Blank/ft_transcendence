import { useState } from 'react';

import { Modal } from 'common';
import { twoFactorAuthStyle } from './ProfileCard.style';

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
        <Modal onClickClose={handleCloseModal}>
          {DUMMY_2FA.isChecked ? (
            <button type="button">cancle 2FA button</button>
          ) : (
            <>
              <div>Check 2FA Github</div>
              <button type="button">Github Icon</button>
            </>
          )}
        </Modal>
      )}
    </>
  );
};
