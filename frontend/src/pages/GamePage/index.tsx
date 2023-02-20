import { useEffect } from 'react';

import { useGetCurrentGameRoom } from 'hooks';
import { useSetRecoilState } from 'recoil';
import { leaveGameRoomState } from 'store';
import GamePong from './game';

export const GamePage = () => {
  const currentGameRoom = useGetCurrentGameRoom();
  const setLeaveGameRoom = useSetRecoilState(leaveGameRoomState);
  useEffect(() => {
    return () => {
      setLeaveGameRoom({ id: currentGameRoom.id });
    };
  }, []);

  return (
    <div>
      <GamePong />
      {/* 게임 설명 예시 */}
      <div>• BALL WILL SERVE AUTOMATICALLY</div>
      <div>• AVOID MISSING BALL FOR HIGH SCORE</div>
    </div>
  );
};
