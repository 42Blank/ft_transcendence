import { MatchHistoryType } from 'types/profile';
import { tmpAvatarStyle } from './tmpAvatarStyle';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div key={history.id}>
      <div className="Winner">
        <img className={tmpAvatarStyle} src={history.winner.avatar} alt="winnerAvatar" />
        <span>{history.winner.nickname}</span>
      </div>
      <div className="loser">
        <img className={tmpAvatarStyle} src={history.loser.avatar} alt="winnerAvatar" />
        <span>{history.loser.nickname}</span>
      </div>
      <div className="date">{history.createdAt}</div>
    </div>
  );
};
