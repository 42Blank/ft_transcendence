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
          <label htmlFor="new-chat-name">이름따위설정할수없다</label>
          {/* <input id="new-chat-name" ref={nameRef} type="text" placeholder="최대 20자" required /> */}
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
