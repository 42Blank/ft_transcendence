import { MatchHistoryType } from 'types/profile';

import { matchAvatarStyle, matchHistoryContainerStyle, matchHistoryBoxStyle } from './MatchHistory.style';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div className={matchHistoryContainerStyle}>
      <div className={matchHistoryBoxStyle}>
        <img className={matchAvatarStyle} src={history.winner.avatar} width={100} height={100} alt="winnerAvatar" />
        <span className="win-lose">WIN</span>
        <span>{history.winner.nickname}</span>
      </div>
      <div className={matchHistoryBoxStyle}>
        <img className={matchAvatarStyle} src={history.loser.avatar} width={100} height={100} alt="loserAvatar" />
        <span className="win-lose">LOSE</span>
        <span>{history.loser.nickname}</span>
      </div>
      <div className="date">Match Time: {history.createdAt}</div>
    </div>
  );
};
