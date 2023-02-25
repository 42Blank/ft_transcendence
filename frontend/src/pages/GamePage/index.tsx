import { useEffect } from 'react';

import { useGetCurrentGameRoom } from 'hooks';
import { useSetRecoilState } from 'recoil';
import { leaveGameRoomState } from 'store';

import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { playerRoleState } from 'store/playerRoleState';
import GamePong from './GamePong';

export const GamePage = () => {
  const nav = useNavigate();
  const currentGameRoom = useGetCurrentGameRoom();
  const setLeaveGameRoom = useSetRecoilState(leaveGameRoomState);
  const setPlayerRole = useSetRecoilState(playerRoleState);

  useEffect(() => {
    return () => {
      setPlayerRole({ role: 'none' });
      setLeaveGameRoom({ id: currentGameRoom.id });
    };
  }, []);

  useEffect(() => {
    if (currentGameRoom.state === 'finished') {
      nav(`${ROUTE.RESULT}/${currentGameRoom.matchHistoryId}`);
    }
  }, [currentGameRoom]);

  return (
    <div>
      <div>
        <GamePong />
      </div>
      <div>
        <span>• BALL WILL SERVE AUTOMATICALLY</span>
        <span>• AVOID MISSING BALL FOR HIGH SCORE</span>
      </div>
    </div>
  );
};
