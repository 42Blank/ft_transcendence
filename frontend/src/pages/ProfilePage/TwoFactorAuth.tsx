import { useState } from 'react';

import { Modal } from 'common';

interface TwoFactorAuthType {
  isChecked: boolean;
}

const DUMMY_2FA: TwoFactorAuthType = {
  isChecked: false,
};

export const TwoFactorAuth = () => {
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
          Two-Factor Authentication
        </button>
        <input type="checkbox" checked={DUMMY_2FA.isChecked} />
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>
          <div>test</div>
        </Modal>
      )}
    </>
  );
};
