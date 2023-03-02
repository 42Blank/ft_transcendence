import { Button } from 'common';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { joinMatchMakeState, leaveMatchMakeState } from 'store';
import { ladderGameFormWrapperStyle, ladderGameLabelStyle } from './LadderGameModalBody.styles';

interface Props {
  onClickClose: () => void;
}

export const LadderGameModalBody = ({ onClickClose }: Props) => {
  const setJoinMatchMake = useSetRecoilState(joinMatchMakeState);
  const setLeaveMatchMake = useSetRecoilState(leaveMatchMakeState);

  useEffect(() => {
    setJoinMatchMake({ id: 'JoinMatch' });
  }, []);

  useEffect(() => {
    return () => {
      setLeaveMatchMake({ id: 'LeaveMatch' });
    };
  }, []);

  return (
    <div className={ladderGameFormWrapperStyle}>
      <div className={ladderGameLabelStyle}>
        <span>🕰️ 대충 뭔가 돌아감</span>
      </div>
      <Button onClick={onClickClose}>
        <span>취소</span>
      </Button>
    </div>
  );
};
