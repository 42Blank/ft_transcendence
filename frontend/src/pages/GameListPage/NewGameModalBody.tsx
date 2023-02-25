import { Dropdown } from 'common';
import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { newGameRoomState } from 'store';
import { playerRoleState } from 'store/playerRoleState';
// import { NewGameRoomType } from 'types/game';

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
  // const [gameMode, setGameMode] = useState<NewGameRoomType['mode']>('normal');
  const setNewGameRoom = useSetRecoilState(newGameRoomState);
  const setPlayerRole = useSetRecoilState(playerRoleState);

  const dropdownElement = [
    { key: '일반', value: true },
    { key: 'RED', value: false },
  ];

  function handleToggleMode(value: number | boolean) {
    setIsNormal(value as boolean);
    // setGameMode(isNormal ? 'normal' : 'red');
    // console.log('1.MODE: ' + gameMode);
  }
  function handleOnClick(e: FormEvent) {
    // roomTitle 필요없어서 처내야함.
    e.preventDefault();
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
          <span>모드 설정</span>
          <Dropdown currentKey={isNormal ? '일반' : 'RED'} elements={dropdownElement} onChange={handleToggleMode} />
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
