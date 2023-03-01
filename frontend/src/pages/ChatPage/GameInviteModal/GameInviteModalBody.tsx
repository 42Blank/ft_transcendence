import { FormEvent } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { inviteGameRoomState, joinGameRoomState } from '../../../store';

import {
  formSectionButtonWrapper,
  formSectionDivStyle,
  inviteGameFormStyle,
  inviteGameInnerDivStyle,
} from './GameInviteModalBody.styles';

interface Props {
  onClickClose: () => void;
  nickname: string;
  gameRoomId: string;
}

export const GameInviteModalBody = ({ onClickClose, nickname, gameRoomId }: Props) => {
  const inviteGameRoom = useRecoilValue(inviteGameRoomState);
  const resetInviteGameRoom = useResetRecoilState(inviteGameRoomState);
  const setJoinGameRoom = useSetRecoilState(joinGameRoomState);

  function handleOnClick(e: FormEvent) {
    setJoinGameRoom({ id: inviteGameRoom.id });
    resetInviteGameRoom();
  }

  return (
    <div className={inviteGameFormStyle}>
      <div className={inviteGameInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <span>{nickname} 님의 게임 초대를 수락하시겠습니까?</span>
        </div>
      </div>
      <div className={formSectionButtonWrapper}>
        <button type="button" onClick={onClickClose}>
          <span>취소</span>
        </button>
        <button type="button" onClick={handleOnClick}>
          <span>수락</span>
        </button>
      </div>
    </div>
  );
};
