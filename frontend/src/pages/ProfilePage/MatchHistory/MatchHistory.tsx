import { MatchHistoryType } from 'types/profile';

import { matchHistoryContainerStyle } from './MatchHistory.style';
import { MatchHistoryBox } from './MatchHistoryBox';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div className={matchHistoryContainerStyle}>
      {/* <div className={matchHistoryBoxStyle}>
        <img className={matchAvatarStyle} src={history.winner.avatar} width={100} height={100} alt="winnerAvatar" />
        <span className="win-lose">WIN</span>
        <span className="nick">{history.winner.nickname}</span>
      </div>
      <div className={matchHistoryBoxStyle}>
        <img className={matchAvatarStyle} src={history.loser.avatar} width={100} height={100} alt="loserAvatar" />
        <span className="win-lose">LOSE</span>
        <span className="nick">{history.loser.nickname}</span>
      </div> */}
      <MatchHistoryBox user={history.winner} key="WIN" />
      <MatchHistoryBox user={history.loser} key="LOSE" />
      <div className="time">Match Time: {history.createdAt}</div>
    </div>
  );
};
