import { useState } from 'react';

import { PlusIcon } from 'assets';
import { Modal } from 'common';

import {
  gameListWrapperStyle,
  gameRoomIconStyle,
  newGameModalHeaderStyle,
  newGameModalWrapperStyle,
} from './GameListPage.styles';

export const GameListPage = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  function handleClickButton() {
    setIsModalShown(true);
  }

  function handleClickClose() {
    setIsModalShown(false);
  }

  return (
    <main className={gameListWrapperStyle}>
      <button type="button" onClick={handleClickButton} className={gameRoomIconStyle}>
        <PlusIcon />
      </button>
      {isModalShown && (
        <Modal onClickClose={handleClickClose} className={newGameModalWrapperStyle}>
          <header className={newGameModalHeaderStyle}>
            <h4>새 게임</h4>
          </header>
        </Modal>
      )}
    </main>
  );
};
