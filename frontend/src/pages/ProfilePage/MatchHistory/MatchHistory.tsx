import { MatchHistoryType } from 'types/profile';

import { matchHistoryContainerStyle } from './MatchHistory.style';
import { MatchHistoryBox } from './MatchHistoryBox';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div className={matchHistoryContainerStyle}>
      <MatchHistoryBox user={history.winner} result="WIN" />
      <MatchHistoryBox user={history.loser} result="LOSE" />
      <div className="time">Match Time: {history.createdAt}</div>
    </div>
  );
};
