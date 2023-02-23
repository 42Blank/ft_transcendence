import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { ROUTE } from 'common/constants';
import { useGetCurrentGameRoom } from 'hooks';
import { leaveGameRoomState } from 'store';

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

  const hostUser = currentGameRoom.host;
  const chalUser = currentGameRoom.challenger;
  const { score } = currentGameRoom;

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
            {hostUser.user.nickname} 🆚 {chalUser && chalUser.user.nickname}
          </h1>
          <h1>
            {score && score.host} : {score && score.challenger}
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
