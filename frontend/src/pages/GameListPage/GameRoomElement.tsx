import { Button } from 'common';
import { Avatar } from 'common/Avatar';
import { useSetRecoilState } from 'recoil';
import { joinGameRoomState, joinSpectateRoomState, playerRoleState } from 'store';
import { GameRoomInfoType } from 'types/game';

import {
  gameRoomElementStyle,
  gameRoomVsSectionStyle,
  gameRoomVsSpanStyle,
  gameRoomFormSectionStyle,
  gameRoomFormButtonSectionStyle,
  gameRoomTextSectionStyle,
  gameRoomAvatarSectionStyle,
  gameRoomUserWrapperStyle,
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
    <div className={gameRoomElementStyle}>
      <h3>
        {mode} - {state}
      </h3>
      <div className={gameRoomFormSectionStyle}>
        <div className={gameRoomVsSectionStyle}>
          <div className={gameRoomUserWrapperStyle}>
            <Avatar userAvatar={host.user.avatar} className={gameRoomAvatarSectionStyle} />
            <span className={gameRoomTextSectionStyle}>{host.user.nickname}</span>
          </div>
          <span className={gameRoomVsSpanStyle}>vs</span>
          <div className={gameRoomUserWrapperStyle}>
            <Avatar userAvatar={challenger && challenger.user.avatar} className={gameRoomAvatarSectionStyle} />
            <span className={gameRoomTextSectionStyle}>{challenger && challenger.user.nickname}</span>
          </div>
        </div>
        <div className={gameRoomFormButtonSectionStyle}>
          <Button onClick={handleClickJoinButton}>
            <span>입장</span>
          </Button>
          <Button onClick={handleClickSpectateButton}>
            <span>관전</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
