import { MatchHistoryType } from 'types/profile';
import { MatchHistoryBox } from './MatchHistoryBox';

import { matchHistoryContainerStyle } from './MatchHistory.style';

interface Props {
  history: MatchHistoryType;
  userId: number;
}

export const MatchHistory = ({ history, userId }: Props) => {
  return (
    <div className={matchHistoryContainerStyle}>
      {userId === history.winner.id ? (
        <>
          <MatchHistoryBox user={history.winner} result="WIN" />
          <MatchHistoryBox user={history.loser} result="LOSE" />
        </>
      ) : (
        <>
          <MatchHistoryBox user={history.loser} result="LOSE" />
          <MatchHistoryBox user={history.winner} result="WIN" />
        </>
      )}
      <div className="time">Match Time: {history.createdAt}</div>
    </div>
  );
};
