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
        <span>π°οΈ λμΆ© λ­κ° λμκ°</span>
      </div>
      <Button onClick={onClickClose}>
        <span>μ·¨μ</span>
      </Button>
    </div>
  );
};
