import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FightIcon, PlusIcon } from 'assets';
import { Modal } from 'common';
import { gameRoomListState, leaveMatchMakeState } from 'store';
import { GameRoomElement } from './GameRoomElement';

import {
  gameListWrapperStyle,
  gameMatchIconStyle,
  gameRoomIconStyle,
  newGameModalHeaderStyle,
  newGameModalWrapperStyle,
} from './GameListPage.styles';
import { NewGameModalBody } from './NewGameModalBody';
import { LadderGameModalBody } from './LadderGameModalBody';

export const GameListPage = () => {
  const [isNewGameModalShown, setIsNewGameModalShown] = useState(false);
  const [isLadderModalShown, setIsLadderModalShown] = useState(false);
  const gameRoomList = useRecoilValue(gameRoomListState);
  const setLeaveMatchMake = useSetRecoilState(leaveMatchMakeState);

  // joinmatchmake
  // leavematchmake
  // 변경점이 있어야 recoil 업데이트 되니까 아무거나 넣으면 됨.

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
      setLeaveMatchMake({ id: 'LeaveMatch' });
      window.location.reload();
    }
  }
  useEffect(() => {
    return () => {
      if (isLadderModalShown) {
        setIsLadderModalShown(false);
        setLeaveMatchMake({ id: 'LeaveMatch' });
        window.location.reload();
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
        <Modal onClickClose={handleClickClose} className={newGameModalWrapperStyle}>
          <header className={newGameModalHeaderStyle}>
            <h4>🐦 게임 만들기</h4>
          </header>
          <NewGameModalBody onClickClose={handleClickClose} />
        </Modal>
      )}
      {isLadderModalShown && (
        <Modal onClickClose={handleClickClose} className={newGameModalWrapperStyle}>
          <header className={newGameModalHeaderStyle}>
            <h4> 상대를 찾는 중</h4>
          </header>
          <LadderGameModalBody onClickClose={handleClickClose} />
        </Modal>
      )}
    </main>
  );
};
