import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { joinMatchMakeState } from 'store';
import {
  formSectionButtonWrapper,
  formSectionDivStyle,
  newGameFormStyle,
  newGameInnerDivStyle,
} from './NewGameModalBody.styles';

interface Props {
  onClickClose: () => void;
}

export const LadderGameModalBody = ({ onClickClose }: Props) => {
  const setJoinMatchMake = useSetRecoilState(joinMatchMakeState);

  useEffect(() => {
    setJoinMatchMake({ id: 'JoinMatch' });
  }, []);
  return (
    <div className={newGameFormStyle}>
      <div className={newGameInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <span>🕰️ 대충 뭔가 돌아감</span>
        </div>
      </div>
      <div className={formSectionButtonWrapper}>
        <button type="button" onClick={onClickClose}>
          취소
        </button>
      </div>
    </div>
  );
};
