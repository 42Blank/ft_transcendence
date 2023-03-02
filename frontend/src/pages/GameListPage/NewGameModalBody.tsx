import { Button, Dropdown } from 'common';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { newGameRoomState, playerRoleState } from 'store';

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
  const [isNormal, setIsNormal] = useState(true);
  const setNewGameRoom = useSetRecoilState(newGameRoomState);
  const setPlayerRole = useSetRecoilState(playerRoleState);

  const dropdownElement = [
    { key: '일반', value: true },
    { key: 'RED', value: false },
  ];

  function handleToggleMode(value: number | boolean) {
    setIsNormal(value as boolean);
  }
  function handleOnClick() {
    setPlayerRole({ role: 'host' });
    const mode = isNormal ? 'normal' : 'red';
    setNewGameRoom({
      created: true,
      mode,
    });
    onClickClose();
  }

  return (
    <div className={newGameFormStyle}>
      <div className={newGameInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <label>모드 설정</label>
          <Dropdown currentKey={isNormal ? '일반' : 'RED'} elements={dropdownElement} onChange={handleToggleMode} />
        </div>
      </div>
      <div className={formSectionButtonWrapper}>
        <Button onClick={onClickClose}>
          <span>닫기</span>
        </Button>
        <Button onClick={handleOnClick}>
          <span>생성</span>
        </Button>
      </div>
    </div>
  );
};
