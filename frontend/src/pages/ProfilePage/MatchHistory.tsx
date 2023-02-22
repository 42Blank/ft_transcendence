import { MatchHistoryType } from 'types/profile';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div key={history.id}>
      <div className="Winner">winner</div>
      <div className="loser">loser</div>
      <div className="date">date</div>
    </div>
  );
};
