import { useState } from 'react';

import { Modal } from 'common';

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
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>
          <div>test</div>
        </Modal>
      )}
    </>
  );
};
