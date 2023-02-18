import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { PlusIcon } from 'assets';
import { Modal } from 'common';
import { gameRoomListState } from 'store';
import { GameRoomElement } from './GameRoomElement';

import {
  gameListWrapperStyle,
  gameRoomIconStyle,
  newGameModalHeaderStyle,
  newGameModalWrapperStyle,
} from './GameListPage.styles';
import { NewGameModalBody } from './NewGameModalBody';

export const GameListPage = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const gameRoomList = useRecoilValue(gameRoomListState);

  function handleClickButton() {
    setIsModalShown(true);
  }

  function handleClickClose() {
    setIsModalShown(false);
  }
  return (
    <main className={gameListWrapperStyle}>
      {gameRoomList.map((data, index) => (
        <GameRoomElement key={`game-room-${index}`} gameRoomInfo={data} />
      ))}
      <button type="button" onClick={handleClickButton} className={gameRoomIconStyle}>
        <PlusIcon />
      </button>
      {isModalShown && (
        <Modal onClickClose={handleClickClose} className={newGameModalWrapperStyle}>
          <header className={newGameModalHeaderStyle}>
            <h4>🐦 게임 만들기</h4>
          </header>
          <NewGameModalBody onClickClose={handleClickClose} />
        </Modal>
      )}
    </main>
  );
};
