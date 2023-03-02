import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { FightIcon, PlusIcon } from 'assets';
import { Modal } from 'common';
import { gameRoomListState } from 'store';
import { GameRoomElement } from './GameRoomElement';

import { gameListWrapperStyle, gameMatchIconStyle, gameRoomIconStyle } from './GameListPage.styles';
import { newGameFormTitleStyle, newGameFormWrapperStyle, newGameModalStyle } from './NewGameModalBody.styles';
import { LadderGameModalBody } from './LadderGameModalBody';
import { NewGameModalBody } from './NewGameModalBody';
import {
  ladderGameFormTitleStyle,
  ladderGameFormWrapperStyle,
  ladderGameModalStyle,
} from './LadderGameModalBody.styles';

export const GameListPage = () => {
  const [isNewGameModalShown, setIsNewGameModalShown] = useState(false);
  const [isLadderModalShown, setIsLadderModalShown] = useState(false);
  const gameRoomList = useRecoilValue(gameRoomListState);

  function handleClickButton() {
    setIsNewGameModalShown(true);
  }

  function handleClickLadderButton() {
    setIsLadderModalShown(true);
  }

  function handleClickClose() {
    setIsNewGameModalShown(false);
    if (isLadderModalShown) {
      setIsLadderModalShown(false);
    }
  }
  useEffect(() => {
    return () => {
      if (isLadderModalShown) {
        setIsLadderModalShown(false);
      }
    };
  }, []);
  return (
    <main className={gameListWrapperStyle}>
      {gameRoomList.map((data, index) => (
        <GameRoomElement key={`game-room-${index}`} gameRoomInfo={data} />
      ))}
      <button type="button" onClick={handleClickButton} className={gameRoomIconStyle}>
        <PlusIcon />
      </button>
      <button type="button" onClick={handleClickLadderButton} className={gameMatchIconStyle}>
        <FightIcon />
      </button>
      {isNewGameModalShown && (
        <Modal onClickClose={handleClickClose} className={newGameModalStyle}>
          <header className={newGameFormWrapperStyle}>
            <h3 className={newGameFormTitleStyle}>새 게임 만들기</h3>
          </header>
          <NewGameModalBody onClickClose={handleClickClose} />
        </Modal>
      )}
      {isLadderModalShown && (
        <Modal onClickClose={handleClickClose} className={ladderGameModalStyle}>
          <header className={ladderGameFormWrapperStyle}>
            <h4 className={ladderGameFormTitleStyle}> 상대를 찾는 중</h4>
          </header>
          <LadderGameModalBody onClickClose={handleClickClose} />
        </Modal>
      )}
    </main>
  );
};
