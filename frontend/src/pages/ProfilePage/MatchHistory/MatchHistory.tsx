import { MatchHistoryType } from 'types/profile';

import { tmpAvatarStyle } from '../tmpAvatarStyle';
import { matchHistoryContainerStyle, matchHistoryLoserStyle, matchHistoryWinnerStyle } from './MatchHistory.style';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div className={matchHistoryContainerStyle}>
      <div className={matchHistoryWinnerStyle}>
        <img className={tmpAvatarStyle} src={history.winner.avatar} width={100} height={100} alt="winnerAvatar" />
        <span>Win : {history.winner.nickname}</span>
      </div>
      <div className={matchHistoryLoserStyle}>
        <img className={tmpAvatarStyle} src={history.loser.avatar} width={100} height={100} alt="loserAvatar" />
        <span>Lose : {history.loser.nickname}</span>
      </div>
      <div className="date">Match Time: {history.createdAt}</div>
    </div>
  );
};
