import { useEffect, useState } from 'react';

import { useGetCurrentGameRoom } from 'hooks';
import { useSetRecoilState } from 'recoil';
import { leaveGameRoomState } from 'store';

import { Modal } from 'common';
import GamePong from './game';
import { GameResultModalBody } from './GameResultModalBody';

import { newGameModalHeaderStyle } from './GameResultModalBody.styles';

export const GamePage = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const currentGameRoom = useGetCurrentGameRoom();
  const setLeaveGameRoom = useSetRecoilState(leaveGameRoomState);

  useEffect(() => {
    return () => {
      setLeaveGameRoom({ id: currentGameRoom.id });
    };
  }, []);

  useEffect(() => {
    if (currentGameRoom.state === 'finished') setIsModalShown(true);
  }, [currentGameRoom]);

  return (
    <div>
      <GamePong />
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
