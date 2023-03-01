import { FightIcon } from 'assets';
import { MatchHistoryType } from 'types/profile';
import { MatchHistoryUserBox } from './MatchHistoryUserBox';

import { matchHistoryTimeWrapper, matchHistoryUserWrapper, matchHistoryWrapper } from './MatchHistoryElement.styles';

interface Props {
  history: MatchHistoryType;
  userId: number;
}

export const MatchHistoryElement = ({ history, userId }: Props) => {
  const { winner, loser, createdAt } = history;
  const historyDate = new Date(createdAt);

  return (
    <li className={matchHistoryWrapper}>
      <div className={matchHistoryTimeWrapper}>
        <span>{historyDate.toLocaleDateString()}</span>
        <span>{historyDate.toLocaleTimeString()}</span>
      </div>
      <div className={matchHistoryUserWrapper}>
        {userId === winner.id ? (
          <>
            <MatchHistoryUserBox user={winner} isWon />
            <FightIcon />
            <MatchHistoryUserBox user={loser} isRight />
          </>
        ) : (
          <>
            <MatchHistoryUserBox user={loser} />
            <FightIcon />
            <MatchHistoryUserBox user={winner} isWon isRight />
          </>
        )}
      </div>
    </li>
  );
};
