import { useSetRecoilState } from 'recoil';
import { joinGameRoomState } from 'store';
import { GameRoomInfoType } from 'types/game';

import {
  gameRoomElementStyle,
  gameRoomVsSectionStyle,
  gameRoomLinkStyle,
  gameRoomUserWrapperStyle,
  gameRoomVsSpanStyle,
} from './GameRoomElement.styles';

interface Props {
  gameRoomInfo: GameRoomInfoType;
}

export const GameRoomElement = ({ gameRoomInfo }: Props) => {
  const { id: roomID, host, challenger } = gameRoomInfo;
  const setJoinGameRoom = useSetRecoilState(joinGameRoomState);

  function handleClickJoinButton() {
    setJoinGameRoom({ id: roomID });
  }

  return (
    <button type="button" onClick={handleClickJoinButton} className={gameRoomLinkStyle}>
      <div className={gameRoomElementStyle}>
        <div className={gameRoomVsSectionStyle}>
          <div className={gameRoomUserWrapperStyle}>
            <img
              src="https://beebom.com/wp-content/uploads/2022/10/Cute-Weakened-form-of-Pochita.jpg?w=640"
              width={70}
              height={70}
              alt="profile1"
            />
            <span>{host.user.nickname}</span>
          </div>
          <span className={gameRoomVsSpanStyle}>vs</span>
          <div className={gameRoomUserWrapperStyle}>
            <img
              src="https://pbs.twimg.com/profile_images/1579899155048239127/xbwg77D0_400x400.jpg"
              width={70}
              height={70}
              alt="profile1"
            />
            <span>{challenger && challenger.user.nickname}</span>
          </div>
        </div>
      </div>
    </button>
  );
};
