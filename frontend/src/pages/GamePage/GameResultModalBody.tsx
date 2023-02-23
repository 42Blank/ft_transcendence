import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ROUTE } from 'common/constants';
import { useGetCurrentGameRoom } from 'hooks';
import { leaveGameRoomState } from 'store';
import { finishedGameState } from 'store/finishedGameState';

import {
  formSectionButtonWrapper,
  formSectionDivStyle,
  newGameFormStyle,
  newGameInnerDivStyle,
} from './GameResultModalBody.styles';

export const GameResultModalBody = () => {
  const nav = useNavigate();
  const currentGameRoom = useGetCurrentGameRoom();
  const setLeaveGameRoom = useSetRecoilState(leaveGameRoomState);
  const finishedGame = useRecoilValue(finishedGameState);

  function handleOnClick() {
    setLeaveGameRoom({ id: currentGameRoom.id });
    nav(ROUTE.GAME);
    window.location.reload();
  }

  return (
    <div className={newGameFormStyle}>
      <div className={newGameInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <h1>
            🏅{finishedGame.winner.nickname} 🆚 {finishedGame.loser.nickname}
          </h1>
        </div>
      </div>
      <div className={formSectionButtonWrapper}>
        <button type="button" onClick={handleOnClick}>
          <span>게임 메뉴로 돌아가기</span>
        </button>
      </div>
    </div>
  );
};
