import { FormEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { newGameRoomState } from 'store';
import { playerRoleState } from 'store/playerRoleState';

import {
  formSectionButtonWrapper,
  formSectionDivStyle,
  newGameFormStyle,
  newGameInnerDivStyle,
} from './NewGameModalBody.styles';

interface Props {
  onClickClose: () => void;
}

export const NewGameModalBody = ({ onClickClose }: Props) => {
  const setNewGameRoom = useSetRecoilState(newGameRoomState);
  const setPlayerRole = useSetRecoilState(playerRoleState);

  function handleOnClick(e: FormEvent) {
    // roomTitle 필요없어서 처내야함.
    e.preventDefault();
    setPlayerRole({ role: 'host' });
    setNewGameRoom({
      created: true,
    });
    onClickClose();
  }

  return (
    <div className={newGameFormStyle}>
      <div className={newGameInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <input type="checkbox" disabled={} />
          <label>RED MODE ON</label>
        </div>
      </div>
      <div className={formSectionButtonWrapper}>
        <button type="button" onClick={onClickClose}>
          닫기
        </button>
        <button type="button" onClick={handleOnClick}>
          생성
        </button>
      </div>
    </div>
  );
};
