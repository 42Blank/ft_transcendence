import { MatchHistoryType } from 'types/profile';
import { tmpAvatarStyle } from './tmpAvatarStyle';
import { tmpMatchHistoryLoserStyle, tmpMatchHistoryWinnerStyle } from './tmpMatchHistory.style';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div>
      <div className={tmpMatchHistoryWinnerStyle}>
        <img className={tmpAvatarStyle} src={history.winner.avatar} alt="winnerAvatar" />
        <span>Win : {history.winner.nickname}</span>
      </div>
      <div className={tmpMatchHistoryLoserStyle}>
        <img className={tmpAvatarStyle} src={history.loser.avatar} alt="loserAvatar" />
        <span>Lose : {history.loser.nickname}</span>
      </div>
      <div className="date">Match Time: {history.createdAt}</div>
    </div>
  );
};