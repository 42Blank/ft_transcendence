import { ROUTE } from 'common/constants';
import { useGetCurrentGameRoom } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { leaveGameRoomState } from 'store';

import {
  formSectionButtonWrapper,
  formSectionDivStyle,
  newGameFormStyle,
  newGameInnerDivStyle,
} from './GameResultModalBody.styles';

export const GameResultModalBody = () => {
  const navigate = useNavigate();
  const currentGameRoom = useGetCurrentGameRoom();
  const setLeaveGameRoom = useSetRecoilState(leaveGameRoomState);
  // const nameRef = useRef<HTMLInputElement>(null);

  function handleOnClick() {
    setLeaveGameRoom({ id: currentGameRoom.id });
    navigate(ROUTE.GAME);
    window.location.reload();
  }

  return (
    <div className={newGameFormStyle}>
      <div className={newGameInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <label>
            {currentGameRoom.host.user.nickname} 🆚{' '}
            {currentGameRoom.challenger && currentGameRoom.challenger.user.nickname}
          </label>
          <label>
            {currentGameRoom.score && currentGameRoom.score.host} :{' '}
            {currentGameRoom.score && currentGameRoom.score.challenger}
          </label>
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
