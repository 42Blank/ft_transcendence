import { useSetRecoilState } from 'recoil';
import { joinGameRoomState, joinSpectateRoomState } from 'store';
import { playerRoleState } from 'store/playerRoleState';
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
  const { id: roomID, host, challenger, state, mode } = gameRoomInfo;
  const setJoinGameRoom = useSetRecoilState(joinGameRoomState);
  const setJoinSpectateRoom = useSetRecoilState(joinSpectateRoomState);
  const setPlayerRole = useSetRecoilState(playerRoleState);

  function handleClickJoinButton() {
    setPlayerRole({ role: 'challenger' });
    setJoinGameRoom({ id: roomID });
  }
  function handleClickSpectateButton() {
    setPlayerRole({ role: 'spectator' });
    setJoinSpectateRoom({ id: roomID });
  }

  return (
    <div className={gameRoomLinkStyle}>
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
          <div>
            <span>{mode}</span>
          </div>
          <div>
            <span>{state}</span>
          </div>
          <div>
            <button type="button" onClick={handleClickJoinButton}>
              <span>[입장]</span>
            </button>
            <button type="button" onClick={handleClickSpectateButton}>
              <span>[관전]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
