import { useState } from 'react';

import { Modal } from 'common';

interface TwoFactorAuthType {
  isChecked: boolean;
}

const DUMMY_2FA: TwoFactorAuthType = {
  isChecked: false,
};

interface Props {
  className?: string;
}

export const TwoFactorAuth = ({ className }: Props) => {
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
          Two-Factor Authentication
        </button>
        <input type="checkbox" checked={DUMMY_2FA.isChecked} />
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
