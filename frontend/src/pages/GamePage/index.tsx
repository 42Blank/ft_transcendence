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
  function onClickCancle() {
    setPlayerRole({ role: 'none' });
    setLeaveGameRoom({ id: currentGameRoom.id });
    nav(ROUTE.GAME);
  }

  if (currentGameRoom.state === 'waiting') {
    return (
      <div>
        <span>상대를 기다리는 중</span>
        <button type="button" onClick={onClickCancle}>
          <span>취소</span>
        </button>
      </div>
    );
  }
  return (
    <div>
      <div>
        <GamePong />
      </div>
      <div>
        <ul>
          <li>상하 방향키로 패들을 조작합니다.</li>
          <li>공은 자동으로 서브 됩니다.</li>
          <li>고득점을 위해 공을 놓치지 마세요!</li>
        </ul>
      </div>
    </div>
  );
};
