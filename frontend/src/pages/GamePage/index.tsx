import { useEffect, useState } from 'react';

import { Modal } from 'common';
import { useGetCurrentGameRoom } from 'hooks';
import { useSetRecoilState } from 'recoil';
import { leaveGameRoomState } from 'store';
import GamePong from './game';

import { GameResultModalBody } from './GameResultModalBody';
import { newGameModalHeaderStyle } from './GameResultModalBody.styles';

export const GamePage = () => {
  const [isModalShown] = useState(true);
  const currentGameRoom = useGetCurrentGameRoom();
  const setLeaveGameRoom = useSetRecoilState(leaveGameRoomState);

  useEffect(() => {
    return () => {
      setLeaveGameRoom({ id: currentGameRoom.id });
    };
  }, []);

  // function handleClickButton() {
  //  setIsModalShown(true);
  // }

  return (
    <div>
      <GamePong />
      {/* 게임 설명 예시 */}
      <span>• BALL WILL SERVE AUTOMATICALLY</span>
      <span>• AVOID MISSING BALL FOR HIGH SCORE</span>
      {isModalShown && (
        <Modal onClickClose={() => {}}>
          <header className={newGameModalHeaderStyle}>
            <h4> Game Result </h4>
          </header>
          <GameResultModalBody />
        </Modal>
      )}
    </div>
  );
};
