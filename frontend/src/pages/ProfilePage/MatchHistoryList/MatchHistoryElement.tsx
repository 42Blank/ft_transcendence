import { MatchHistoryType } from 'types/profile';
import { matchHistoryWrapper } from './MatchHistoryElement.styles';
import { MatchHistoryUserBox } from './MatchHistoryUserBox';

interface Props {
  history: MatchHistoryType;
  userId: number;
}

export const MatchHistoryElement = ({ history, userId }: Props) => {
  const { winner, loser } = history;

  return (
    <li className={matchHistoryWrapper}>
      {userId === winner.id ? (
        <>
          <MatchHistoryUserBox user={winner} isWon />
          <MatchHistoryUserBox user={loser} />
        </>
      ) : (
        <>
          <MatchHistoryUserBox user={loser} />
          <MatchHistoryUserBox user={winner} isWon />
        </>
      )}
    </li>
  );
};
